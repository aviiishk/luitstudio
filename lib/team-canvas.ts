// Shared by the public team canvas (components/sections/about/TeamTree.tsx)
// and the admin layout editor (components/admin/TeamLayoutEditor.tsx) so
// both draw connectors identically. The root always sits at world (0, 0);
// every member connects directly to it — never to each other.

export const ROOT_ANCHOR_Y = 46; // root's visual bottom edge, where branches start

/**
 * A smooth cubic bezier from the root anchor to a member's position.
 * Computed purely from the two endpoints -- never hard-coded -- so it
 * stays correct as positions move.
 */
export function buildConnectorPath(x: number, y: number): string {
  const startX = 0;
  const startY = ROOT_ANCHOR_Y;
  const c1x = startX + (x - startX) * 0.25;
  const c1y = startY + (y - startY) * 0.35;
  const c2x = startX + (x - startX) * 0.6;
  const c2y = startY + (y - startY) * 0.85;
  return `M${startX} ${startY} C${c1x} ${c1y} ${c2x} ${c2y} ${x} ${y}`;
}
