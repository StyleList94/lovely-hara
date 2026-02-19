'use client';

import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { toast } from 'sonner';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  TextInput,
} from '@stylelist94/nine-beauty-actress';

import { cn } from '@/shared/lib/utils';

type CubicBezier = [number, number, number, number];

const PRESETS: { label: string; value: CubicBezier }[] = [
  { label: 'linear', value: [0, 0, 1, 1] },
  { label: 'snap', value: [0.2, 0, 0, 1] },
  { label: 'expo', value: [0.16, 1, 0.3, 1] },
  { label: 'overshoot', value: [0.34, 1.56, 0.64, 1] },
  { label: 'swift', value: [0.55, 0, 0.1, 1] },
  { label: 'Linear', value: [0.36, 0.66, 0.04, 1] },
  { label: 'iOS', value: [0.25, 0.1, 0.25, 1] },
  { label: 'Material', value: [0.2, 0, 0, 1] },
  { label: 'Stripe', value: [0.5, 0, 0, 1] },
  { label: 'Vercel', value: [0.76, 0, 0.24, 1] },
];

const SVG_SIZE = 200;
const PADDING = 12;
const GRAPH_SIZE = SVG_SIZE - PADDING * 2;

const toSvgX = (val: number) => PADDING + val * GRAPH_SIZE;
const toSvgY = (val: number) => PADDING + (1 - val) * GRAPH_SIZE;
const fromSvgX = (px: number) =>
  Math.max(0, Math.min(1, (px - PADDING) / GRAPH_SIZE));
const fromSvgY = (py: number) => {
  const raw = 1 - (py - PADDING) / GRAPH_SIZE;
  return Math.round(Math.max(-0.5, Math.min(1.5, raw)) * 100) / 100;
};

const CurveGraph = ({
  points,
  onDrag,
}: {
  points: CubicBezier;
  onDrag: (index: 0 | 1, x: number, y: number) => void;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const draggingRef = useRef<0 | 1 | null>(null);

  const [x1, y1, x2, y2] = points;

  const pathD = `M ${toSvgX(0)},${toSvgY(0)} C ${toSvgX(x1)},${toSvgY(y1)} ${toSvgX(x2)},${toSvgY(y2)} ${toSvgX(1)},${toSvgY(1)}`;

  const handlePointerDown = (index: 0 | 1) => (e: ReactPointerEvent) => {
    e.preventDefault();
    draggingRef.current = index;
    svgRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = useCallback(
    (e: ReactPointerEvent) => {
      if (draggingRef.current === null) return;
      const svg = svgRef.current;
      if (!svg) return;

      const rect = svg.getBoundingClientRect();
      const scaleX = SVG_SIZE / rect.width;
      const scaleY = SVG_SIZE / rect.height;
      const px = (e.clientX - rect.left) * scaleX;
      const py = (e.clientY - rect.top) * scaleY;

      onDrag(draggingRef.current, fromSvgX(px), fromSvgY(py));
    },
    [onDrag],
  );

  const handlePointerUp = useCallback(() => {
    draggingRef.current = null;
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
      className="w-full aspect-square max-w-50 select-none touch-none overflow-visible"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Background */}
      <rect
        x={PADDING}
        y={PADDING}
        width={GRAPH_SIZE}
        height={GRAPH_SIZE}
        className="fill-zinc-50 dark:fill-zinc-900"
        rx={4}
      />

      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map((v) => (
        <g key={v}>
          <line
            x1={toSvgX(v)}
            y1={toSvgY(0)}
            x2={toSvgX(v)}
            y2={toSvgY(1)}
            className="stroke-zinc-200 dark:stroke-zinc-700"
            strokeWidth={0.5}
          />
          <line
            x1={toSvgX(0)}
            y1={toSvgY(v)}
            x2={toSvgX(1)}
            y2={toSvgY(v)}
            className="stroke-zinc-200 dark:stroke-zinc-700"
            strokeWidth={0.5}
          />
        </g>
      ))}

      {/* Linear reference */}
      <line
        x1={toSvgX(0)}
        y1={toSvgY(0)}
        x2={toSvgX(1)}
        y2={toSvgY(1)}
        className="stroke-zinc-300 dark:stroke-zinc-600"
        strokeWidth={1}
        strokeDasharray="4 4"
      />

      {/* Control lines */}
      <line
        x1={toSvgX(0)}
        y1={toSvgY(0)}
        x2={toSvgX(x1)}
        y2={toSvgY(y1)}
        className="stroke-rose-400"
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      <line
        x1={toSvgX(1)}
        y1={toSvgY(1)}
        x2={toSvgX(x2)}
        y2={toSvgY(y2)}
        className="stroke-blue-400"
        strokeWidth={1}
        strokeDasharray="3 3"
      />

      {/* Curve */}
      <path
        d={pathD}
        fill="none"
        className="stroke-zinc-800 dark:stroke-zinc-100"
        strokeWidth={2.5}
        strokeLinecap="round"
      />

      {/* Start / End dots */}
      <circle cx={toSvgX(0)} cy={toSvgY(0)} r={3} className="fill-zinc-400" />
      <circle cx={toSvgX(1)} cy={toSvgY(1)} r={3} className="fill-zinc-400" />

      {/* P1 handle */}
      <circle
        cx={toSvgX(x1)}
        cy={toSvgY(y1)}
        r={7}
        className="fill-rose-500 cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown(0)}
      />

      {/* P2 handle */}
      <circle
        cx={toSvgX(x2)}
        cy={toSvgY(y2)}
        r={7}
        className="fill-blue-500 cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown(1)}
      />
    </svg>
  );
};

const AnimationPreview = ({
  points,
  duration,
  playKey,
  onComplete,
}: {
  points: CubicBezier;
  duration: number;
  playKey: number;
  onComplete: () => void;
}) => {
  const cubicBezierCss = `cubic-bezier(${points.join(', ')})`;

  return (
    <div
      className={cn(
        'overflow-hidden flex w-full p-0.5 rounded-xl',
        'border-4 border-zinc-200/30 dark:border-zinc-700/30',
      )}
    >
      <div className="relative flex flex-col justify-center items-start w-full h-10">
        <div className="absolute h-2 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
        <div
          key={playKey}
          className={cn(
            'relative w-8 h-8 rounded-full shadow-border',
            'bg-rose-200 border border-rose-100',
          )}
          style={
            playKey > 0
              ? {
                  animation: `easing-slide ${duration}s ${cubicBezierCss} forwards`,
                }
              : undefined
          }
          onAnimationEnd={onComplete}
        />
      </div>
    </div>
  );
};

const EasingCurve = () => {
  const [points, setPoints] = useState<CubicBezier>([0.25, 0.1, 0.25, 1]);
  const [duration, setDuration] = useState('1');
  const [playKey, setPlayKey] = useState(0);

  const durationSec = Math.max(0.1, Number(duration) || 1);

  const handleDrag = useCallback((index: 0 | 1, x: number, y: number) => {
    setPoints((prev) => {
      const next = [...prev] as CubicBezier;
      if (index === 0) {
        next[0] = Math.round(x * 100) / 100;
        next[1] = y;
      } else {
        next[2] = Math.round(x * 100) / 100;
        next[3] = y;
      }
      return next;
    });
  }, []);

  const handlePreset = (value: CubicBezier) => () => {
    setPoints(value);
  };

  const handleInputChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseFloat(e.target.value);
      if (Number.isNaN(val)) return;
      setPoints((prev) => {
        const next = [...prev] as CubicBezier;
        next[index] = Math.round(val * 100) / 100;
        return next;
      });
    };

  const cssValue = useMemo(
    () => `cubic-bezier(${points.join(', ')})`,
    [points],
  );

  const handleClickCopy = async () => {
    try {
      await navigator.clipboard.writeText(cssValue);
      toast.success('Copied!', {
        position: 'bottom-right',
        duration: 1000,
      });
    } catch {
      /* empty */
    }
  };

  // Inject keyframes into document
  useEffect(() => {
    const styleId = 'easing-curve-keyframes';
    if (document.getElementById(styleId)) return;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes easing-slide {
        from { left: 0; }
        to { left: calc(100% - 2rem); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <Card className="@container w-full">
      <CardHeader>
        <CardTitle>곡선의 미학</CardTitle>
        <CardDescription>cubic-bezier</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col @md:flex-row gap-4">
          <div className="relative z-10 flex justify-center">
            <CurveGraph points={points} onDrag={handleDrag} />
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <div className="grid grid-cols-2 gap-2">
              {['x1', 'y1', 'x2', 'y2'].map((label, i) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span
                    className={cn(
                      'text-xs font-mono',
                      i < 2 ? 'text-rose-500' : 'text-blue-500',
                    )}
                  >
                    {label}
                  </span>
                  <TextInput
                    type="number"
                    step={0.01}
                    min={i % 2 === 0 ? 0 : -0.5}
                    max={i % 2 === 0 ? 1 : 1.5}
                    value={points[i]}
                    onChange={handleInputChange(i)}
                    className="h-8 text-sm"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1">
              {PRESETS.map((preset) => (
                <Button
                  key={preset.label}
                  variant="secondary"
                  size="sm"
                  className="text-xs"
                  onClick={handlePreset(preset.value)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>

            <div className="flex items-center justify-end gap-1">
              <div className="w-16">
                <TextInput
                  type="number"
                  step={0.1}
                  min={0.1}
                  max={10}
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="h-8 text-sm text-right"
                />
              </div>
              <span className="text-xs text-zinc-500 flex-none">sec</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPlayKey((prev) => prev + 1)}
              >
                Play
              </Button>
            </div>
          </div>
        </div>

        <AnimationPreview
          points={points}
          duration={durationSec}
          playKey={playKey}
          onComplete={() => setPlayKey(0)}
        />
      </CardContent>

      <CardFooter>
        <Button variant="outline" className="w-full" onClick={handleClickCopy}>
          <span className="font-mono text-sm truncate">{cssValue}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EasingCurve;
