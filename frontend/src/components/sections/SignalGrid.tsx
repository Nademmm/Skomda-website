"use client";

import { motion } from "framer-motion";

// Signature element: sebuah grid node-dan-jalur yang merepresentasikan
// infrastruktur sinyal/telekomunikasi — bukan dekorasi generik, tapi
// literal merujuk ke identitas "Telkom" (transmisi, node, jaringan).

const nodes = [
  { id: "n1", x: 40, y: 60 },
  { id: "n2", x: 160, y: 30 },
  { id: "n3", x: 280, y: 80 },
  { id: "n4", x: 90, y: 160 },
  { id: "n5", x: 220, y: 190 },
  { id: "n6", x: 340, y: 150 },
  { id: "n7", x: 180, y: 250 },
];

const edges: [string, string][] = [
  ["n1", "n2"],
  ["n2", "n3"],
  ["n1", "n4"],
  ["n2", "n5"],
  ["n3", "n6"],
  ["n4", "n5"],
  ["n5", "n6"],
  ["n4", "n7"],
  ["n5", "n7"],
];

const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

export default function SignalGrid() {
  return (
    <svg
      viewBox="0 0 380 300"
      className="h-full w-full"
      role="img"
      aria-label="Ilustrasi jaringan sinyal telekomunikasi"
    >
      {edges.map(([a, b], i) => {
        const from = nodeMap[a];
        const to = nodeMap[b];
        return (
          <g key={`${a}-${b}`}>
            <line
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="rgba(236,237,239,0.14)"
              strokeWidth={1}
            />
            <motion.circle
              r={2.5}
              fill="#FFC53D"
              initial={{ cx: from.x, cy: from.y, opacity: 0 }}
              animate={{
                cx: [from.x, to.x],
                cy: [from.y, to.y],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.2,
                delay: i * 0.35,
                repeat: Infinity,
                repeatDelay: edges.length * 0.35,
                ease: "easeInOut",
              }}
            />
          </g>
        );
      })}
      {nodes.map((n) => (
        <circle key={n.id} cx={n.x} cy={n.y} r={4} fill="#ECEDEF" fillOpacity={0.85} />
      ))}
    </svg>
  );
}
