"use client";

import { Grid3x3, Minus, Plus, RotateCcw, Save, Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";

import { updateTeamMemberPositions } from "@/app/admin/(dashboard)/team/actions";
import { Logo } from "@/components/shared/Logo";
import { ButtonAction } from "@/components/ui/button";
import { buildConnectorPath } from "@/lib/team-canvas";
import type { TeamMember } from "@/types/team";

interface TeamLayoutEditorProps {
  members: TeamMember[];
}

interface Point {
  x: number;
  y: number;
}

type DragState =
  | { type: "pan"; startClientX: number; startClientY: number; startPan: Point }
  | {
      type: "card";
      id: string;
      startClientX: number;
      startClientY: number;
      startPos: Point;
    };

// Matches the tile size in components/sections/about/TeamTree.tsx exactly
// (128 wide, 4:5 aspect) so the editor is a true 1:1 preview of the public
// site -- positions that look comfortably spaced here look the same there.
const TILE_WIDTH = 128;
const TILE_HEIGHT = 160;
const MIN_ZOOM = 0.3;
const MAX_ZOOM = 2;
const ZOOM_STEP = 0.15;
const GRID_SIZE = 40;

function toPositionMap(members: TeamMember[]): Record<string, Point> {
  return Object.fromEntries(
    members.map((member) => [member.id, { x: member.canvasX, y: member.canvasY }]),
  );
}

export function TeamLayoutEditor({ members }: TeamLayoutEditorProps) {
  const router = useRouter();
  const [positions, setPositions] = useState<Record<string, Point>>(() =>
    toPositionMap(members),
  );
  const savedPositions = useRef(toPositionMap(members));
  const [pan, setPan] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");
  const dragRef = useRef<DragState | null>(null);

  const isDirty = members.some((member) => {
    const saved = savedPositions.current[member.id];
    const current = positions[member.id];
    return saved?.x !== current?.x || saved?.y !== current?.y;
  });

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      const drag = dragRef.current;
      if (!drag) return;

      if (drag.type === "pan") {
        setPan({
          x: drag.startPan.x + (event.clientX - drag.startClientX),
          y: drag.startPan.y + (event.clientY - drag.startClientY),
        });
      } else {
        const dx = (event.clientX - drag.startClientX) / zoom;
        const dy = (event.clientY - drag.startClientY) / zoom;
        setPositions((prev) => ({
          ...prev,
          [drag.id]: { x: drag.startPos.x + dx, y: drag.startPos.y + dy },
        }));
      }
    }

    function handlePointerUp() {
      dragRef.current = null;
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [zoom]);

  function startPan(event: ReactPointerEvent) {
    if (event.button !== 0) return;
    dragRef.current = {
      type: "pan",
      startClientX: event.clientX,
      startClientY: event.clientY,
      startPan: pan,
    };
  }

  function startCardDrag(event: ReactPointerEvent, id: string) {
    event.stopPropagation();
    const current = positions[id] ?? { x: 0, y: 0 };
    dragRef.current = {
      type: "card",
      id,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startPos: current,
    };
  }

  function handleWheel(event: ReactWheelEvent) {
    event.preventDefault();
    setZoom((value) =>
      Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value - event.deltaY * 0.001)),
    );
  }

  function resetView() {
    setPan({ x: 0, y: 0 });
    setZoom(1);
  }

  function discardChanges() {
    setPositions(savedPositions.current);
    setSaveStatus("idle");
  }

  async function handleSave() {
    setIsSaving(true);
    setSaveStatus("idle");

    try {
      const result = await updateTeamMemberPositions(
        members.map((member) => ({
          id: member.id,
          canvasX: Math.round(positions[member.id]?.x ?? 0),
          canvasY: Math.round(positions[member.id]?.y ?? 0),
        })),
      );

      if (result.error) {
        console.error("Failed to save team layout:", result.error);
        setSaveStatus("error");
        return;
      }

      savedPositions.current = positions;
      setSaveStatus("saved");
      router.refresh();
    } catch (error) {
      console.error("Failed to save team layout:", error);
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="border-border flex items-center gap-1 rounded-full border bg-white p-1">
          <button
            type="button"
            onClick={() => setZoom((value) => Math.max(MIN_ZOOM, value - ZOOM_STEP))}
            aria-label="Zoom out"
            className="text-body hover:text-ink hover:bg-surface grid size-8 place-items-center rounded-full transition-colors"
          >
            <Minus aria-hidden="true" size={15} />
          </button>
          <span className="text-body w-12 text-center text-xs font-medium">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoom((value) => Math.min(MAX_ZOOM, value + ZOOM_STEP))}
            aria-label="Zoom in"
            className="text-body hover:text-ink hover:bg-surface grid size-8 place-items-center rounded-full transition-colors"
          >
            <Plus aria-hidden="true" size={15} />
          </button>
          <span className="bg-border mx-1 h-4 w-px" aria-hidden="true" />
          <button
            type="button"
            onClick={resetView}
            className="text-body hover:text-ink hover:bg-surface flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
          >
            <RotateCcw aria-hidden="true" size={13} />
            Reset view
          </button>
          <span className="bg-border mx-1 h-4 w-px" aria-hidden="true" />
          <button
            type="button"
            onClick={() => setShowGrid((value) => !value)}
            aria-pressed={showGrid}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              showGrid
                ? "bg-brand/10 text-brand"
                : "text-body hover:text-ink hover:bg-surface"
            }`}
          >
            <Grid3x3 aria-hidden="true" size={13} />
            Grid
          </button>
        </div>

        <div className="flex items-center gap-3">
          {saveStatus === "saved" ? (
            <span className="text-green-ink text-sm">Saved</span>
          ) : null}
          {saveStatus === "error" ? (
            <span className="text-rose-ink text-sm">Couldn&apos;t save — try again.</span>
          ) : null}
          <button
            type="button"
            onClick={discardChanges}
            disabled={!isDirty}
            className="text-body hover:text-ink flex items-center gap-1.5 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-40"
          >
            <Undo2 aria-hidden="true" size={14} />
            Discard changes
          </button>
          <ButtonAction
            type="button"
            variant="brand"
            icon={Save}
            disabled={!isDirty || isSaving}
            onClick={handleSave}
            className="min-h-10 px-5"
          >
            {isSaving ? "Saving…" : "Save layout"}
          </ButtonAction>
        </div>
      </div>

      <div
        onPointerDown={startPan}
        onWheel={handleWheel}
        className="border-border bg-surface relative h-[640px] w-full cursor-grab overflow-hidden rounded-2xl border touch-none active:cursor-grabbing"
        style={
          showGrid
            ? {
                backgroundImage:
                  "radial-gradient(circle, rgb(0 0 0 / 14%) 1.5px, transparent 1.5px)",
                backgroundSize: `${GRID_SIZE * zoom}px ${GRID_SIZE * zoom}px`,
                backgroundPosition: `${pan.x}px ${pan.y}px`,
              }
            : undefined
        }
      >
        <div
          className="absolute top-1/2 left-1/2"
          style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}
        >
          <div style={{ transform: `scale(${zoom})` }}>
            <svg
              aria-hidden="true"
              width="1"
              height="1"
              style={{ overflow: "visible" }}
              className="pointer-events-none absolute top-0 left-0"
            >
              {members.map((member) => {
                const pos = positions[member.id] ?? { x: 0, y: 0 };
                return (
                  <path
                    key={member.id}
                    d={buildConnectorPath(pos.x, pos.y)}
                    fill="none"
                    stroke="var(--color-brand)"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  />
                );
              })}
            </svg>

            <div
              className="absolute top-0 left-0 w-24"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <Logo className="h-auto w-full" />
            </div>

            {members.map((member) => {
              const pos = positions[member.id] ?? { x: 0, y: 0 };
              return (
                <div
                  key={member.id}
                  onPointerDown={(event) => startCardDrag(event, member.id)}
                  className="absolute top-0 left-0 cursor-grab touch-none select-none active:cursor-grabbing"
                  style={{
                    width: TILE_WIDTH,
                    transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
                  }}
                >
                  <div
                    className="border-canvas bg-surface overflow-hidden rounded-2xl border-4 shadow-md"
                    style={{ height: TILE_HEIGHT }}
                  >
                    {member.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element -- arbitrary uploaded/external URL
                      <img
                        src={member.imageUrl}
                        alt=""
                        draggable={false}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="bg-brand/10 text-brand flex h-full items-center justify-center text-lg font-semibold italic">
                        {member.name
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                    )}
                  </div>
                  <p className="text-ink mt-1 truncate text-center text-[0.7rem] font-medium">
                    {member.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <p className="text-body text-xs">
        Drag the background to pan, scroll to zoom, drag any card to move it.
        Nothing is saved until you click &ldquo;Save layout&rdquo;.
      </p>
    </div>
  );
}
