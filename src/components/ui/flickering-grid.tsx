import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";

interface FlickeringGridProps {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  maxOpacity?: number;
}

const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(0, 0, 0)",
  width,
  height,
  className,
  maxOpacity = 0.3,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInViewRef = useRef(false);
  const animationFrameRef = useRef<number>(0);
  const backgroundColorRef = useRef<string>("#0a0a0f");

  const resolveBackgroundColor = useCallback((el: HTMLElement) => {
    let node: HTMLElement | null = el;
    while (node) {
      const bg = window.getComputedStyle(node).backgroundColor;
      if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
        return bg;
      }
      node = node.parentElement;
    }
    return "#0a0a0f";
  }, []);

  const memoizedColor = useMemo(() => {
    const toRGBA = (color: string) => {
      if (typeof window === "undefined") {
        return `rgba(0, 0, 0,`;
      }
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext("2d");
      if (!ctx) return "rgba(255, 0, 0,";
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
      return `rgba(${r}, ${g}, ${b},`;
    };
    return toRGBA(color);
  }, [color]);

  const setupCanvas = useCallback(
    (
      canvas: HTMLCanvasElement,
      w: number,
      h: number,
      previous?: {
        cols: number;
        rows: number;
        squares: Float32Array;
      },
    ) => {
      const dpr = window.devicePixelRatio || 1;
      const nextWidth = Math.round(w * dpr);
      const nextHeight = Math.round(h * dpr);

      // Setting canvas width/height clears the buffer; avoid it when size is unchanged.
      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
      }
      const cols = Math.max(1, Math.floor(w / (squareSize + gridGap)));
      const rows = Math.max(1, Math.floor(h / (squareSize + gridGap)));

      let squares: Float32Array;
      if (previous && previous.cols === cols && previous.rows === rows) {
        squares = previous.squares;
      } else {
        squares = new Float32Array(cols * rows);

        if (previous) {
          const minCols = Math.min(previous.cols, cols);
          const minRows = Math.min(previous.rows, rows);
          for (let i = 0; i < minCols; i++) {
            for (let j = 0; j < minRows; j++) {
              squares[i * rows + j] = previous.squares[i * previous.rows + j];
            }
          }
        }

        for (let i = 0; i < squares.length; i++) {
          if (squares[i] === 0) {
            squares[i] = Math.random() * maxOpacity;
          }
        }
      }

      return { cols, rows, squares, dpr };
    },
    [squareSize, gridGap, maxOpacity],
  );

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number) => {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[i] = Math.random() * maxOpacity;
        }
      }
    },
    [flickerChance, maxOpacity],
  );

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number,
    ) => {
      ctx.fillStyle = backgroundColorRef.current;
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const opacity = squares[i * rows + j];
          ctx.fillStyle = `${memoizedColor}${opacity})`;
          ctx.fillRect(
            i * (squareSize + gridGap) * dpr,
            j * (squareSize + gridGap) * dpr,
            squareSize * dpr,
            squareSize * dpr,
          );
        }
      }
    },
    [memoizedColor, squareSize, gridGap],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let gridParams: ReturnType<typeof setupCanvas>;
    let resizeRaf = 0;
    backgroundColorRef.current = resolveBackgroundColor(container);

    const updateCanvasSize = () => {
      const newWidth = width || container.clientWidth;
      const newHeight = height || container.clientHeight;
      gridParams = setupCanvas(canvas, newWidth, newHeight, gridParams);

      // Draw immediately after resize to avoid a blank/flash frame.
      drawGrid(
        ctx,
        canvas.width,
        canvas.height,
        gridParams.cols,
        gridParams.rows,
        gridParams.squares,
        gridParams.dpr,
      );
    };

    updateCanvasSize();

    let lastTime = 0;
    const animate = (time: number) => {
      if (!isInViewRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      updateSquares(gridParams.squares, deltaTime);
      drawGrid(
        ctx,
        canvas.width,
        canvas.height,
        gridParams.cols,
        gridParams.rows,
        gridParams.squares,
        gridParams.dpr,
      );
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      if (resizeRaf) return;
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = 0;
        updateCanvasSize();
      });
    });

    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      { threshold: 0 },
    );

    intersectionObserver.observe(canvas);

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      if (resizeRaf) {
        cancelAnimationFrame(resizeRaf);
      }
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  // Run only once on mount — all dependencies are stable refs/callbacks
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
      />
    </div>
  );
};

const MemoizedFlickeringGrid = React.memo(FlickeringGrid);
export { MemoizedFlickeringGrid as FlickeringGrid };
