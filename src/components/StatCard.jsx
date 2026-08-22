export default function StatCard({ icon: Icon, value, label, tint, color }) {
  return (
    <div className="card stat-card">
      <div className="stat-card-icon" style={{ background: tint, color }}>
        <Icon size={17} />
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}
