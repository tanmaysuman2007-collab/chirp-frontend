const COLORS = ["#2563eb", "#7c3aed", "#db2777", "#ea580c", "#059669", "#0891b2", "#ca8a04"];

export default function Avatar({ name = "?", size = 44 }) {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) % COLORS.length;
  return (
    <div className="avatar"
      style={{ width: size, height: size, fontSize: size * 0.42, background: COLORS[h] }}>
      {name[0].toUpperCase()}
    </div>
  );
}
