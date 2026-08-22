import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, PackageSearch } from 'lucide-react'
import SchemeCard from '../components/SchemeCard.jsx'
import SchemeModal from '../components/SchemeModal.jsx'
import Modal from '../components/Modal.jsx'
import Button from '../components/Button.jsx'
import { schemes, categories, occupations, states, ruralUrbanOptions } from '../data/schemes.js'
import { initialSavedSchemeIds } from '../data/applications.js'
import { useToast } from '../components/Toast.jsx'

export default function Schemes() {
  const { showToast } = useToast()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All Categories')
  const [occupation, setOccupation] = useState('Any')
  const [state, setState] = useState('All India')
  const [ruralUrban, setRuralUrban] = useState('Any')
  const [savedIds, setSavedIds] = useState(initialSavedSchemeIds)
  const [activeScheme, setActiveScheme] = useState(null)
  const [modalMode, setModalMode] = useState('details')
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)

  const filtered = useMemo(() => {
    return schemes.filter((s) => {
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.occupation.toLowerCase().includes(q)
      const matchesCategory = category === 'All Categories' || s.category === category
      const matchesOccupation = occupation === 'Any' || s.occupation === occupation || s.occupation === 'Any'
      const matchesState = state === 'All India' || s.state === 'All India' || s.state === state
      const matchesRuralUrban =
        ruralUrban === 'Any' || s.ruralUrban === ruralUrban || s.ruralUrban === 'Rural & Urban'
      return matchesQuery && matchesCategory && matchesOccupation && matchesState && matchesRuralUrban
    })
  }, [query, category, occupation, state, ruralUrban])

  const toggleSave = (id) => {
    setSavedIds((prev) => {
      const isSaved = prev.includes(id)
      if (isSaved) {
        showToast('Removed from saved list')
        return prev.filter((x) => x !== id)
      }
      showToast('Scheme added to saved list')
      return [...prev, id]
    })
  }

  const filterControls = (
    <div className="filter-row">
      <select className="filter-select" value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <select className="filter-select" value={occupation} onChange={(e) => setOccupation(e.target.value)} aria-label="Filter by occupation">
        {occupations.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <select className="filter-select" value={state} onChange={(e) => setState(e.target.value)} aria-label="Filter by state">
        {states.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <select className="filter-select" value={ruralUrban} onChange={(e) => setRuralUrban(e.target.value)} aria-label="Filter by rural or urban">
        {ruralUrbanOptions.map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>
    </div>
  )

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Government Schemes</h1>
          <p>Find schemes and benefits relevant to your situation.</p>
        </div>
        <Button variant="secondary" size="sm" icon={SlidersHorizontal} className="filter-toggle-btn" onClick={() => setFilterDrawerOpen(true)}>
          Filters
        </Button>
      </div>

      <div className="search-bar">
        <Search size={17} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search schemes..."
          aria-label="Search schemes"
        />
      </div>

      {filterControls}

      <p className="results-count">{filtered.length} scheme{filtered.length !== 1 ? 's' : ''} found</p>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <PackageSearch size={40} />
          <h3>No schemes match your filters</h3>
          <p>Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="schemes-grid">
          {filtered.map((s) => (
            <SchemeCard
              key={s.id}
              scheme={s}
              saved={savedIds.includes(s.id)}
              onToggleSave={toggleSave}
              onViewDetails={(scheme) => {
                setActiveScheme(scheme)
                setModalMode('details')
              }}
              onCheckEligibility={(scheme) => {
                setActiveScheme(scheme)
                setModalMode('eligibility')
              }}
            />
          ))}
        </div>
      )}

      {activeScheme && (
        <SchemeModal
          scheme={activeScheme}
          mode={modalMode}
          onClose={() => setActiveScheme(null)}
          onSave={toggleSave}
          saved={savedIds.includes(activeScheme.id)}
        />
      )}

      {filterDrawerOpen && (
        <Modal title="Filter Schemes" onClose={() => setFilterDrawerOpen(false)}>
          <div className="field-group">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="field-group">
            <label>Occupation</label>
            <select value={occupation} onChange={(e) => setOccupation(e.target.value)}>
              {occupations.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="field-group">
            <label>State</label>
            <select value={state} onChange={(e) => setState(e.target.value)}>
              {states.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="field-group">
            <label>Rural / Urban</label>
            <select value={ruralUrban} onChange={(e) => setRuralUrban(e.target.value)}>
              {ruralUrbanOptions.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
          <Button block onClick={() => setFilterDrawerOpen(false)}>
            Apply Filters
          </Button>
        </Modal>
      )}
    </div>
  )
}
