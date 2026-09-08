import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const LOC_API = 'https://local-connect-v2-backend.onrender.com/locations';

const Logo = () => (
  <svg width="44" height="44" viewBox="0 0 62 74" fill="none">
    <path d="M31 2C16.6 2 5 13.6 5 28C5 46.5 31 72 31 72C31 72 57 46.5 57 28C57 13.6 45.4 2 31 2Z" fill="rgba(255,255,255,0.2)"/>
    <circle cx="31" cy="28" r="21" fill="rgba(255,255,255,0.15)"/>
    <polygon points="31,14 18,23 44,23" fill="white"/>
    <rect x="18" y="23" width="26" height="20" rx="1" fill="white"/>
    <rect x="26" y="31" width="10" height="12" rx="1" fill="#1E7B3B"/>
    <rect x="19" y="25" width="7" height="6" rx="1" fill="#A5D6A7"/>
    <rect x="36" y="25" width="7" height="6" rx="1" fill="#A5D6A7"/>
  </svg>
);

const roles = [
  { id: 'CUSTOMER', icon: '👤', label: 'Customer',   desc: 'Find shops & services' },
  { id: 'MERCHANT', icon: '🏪', label: 'Shop Owner', desc: 'List your business' },
];

const inp = {
  width: '100%', boxSizing: 'border-box',
  border: '1.5px solid #E2E8F0', borderRadius: 12,
  padding: '13px 14px', fontSize: 14, color: '#0F172A',
  outline: 'none', fontFamily: 'inherit', background: '#F8FAFC',
  transition: 'all .15s',
};
const sel = {
  ...inp,
  appearance: 'none', WebkitAppearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M6 9l6 6 6-6' stroke='%2364748B' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 14px center',
  paddingRight: 36, cursor: 'pointer',
};
const lbl = { display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.04em' };
const focus = e => { e.target.style.borderColor = '#1E7B3B'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 3px rgba(30,123,59,.12)'; };
const blur  = e => { e.target.style.borderColor = '#E2E8F0'; e.target.style.background = '#F8FAFC'; e.target.style.boxShadow = 'none'; };

const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'MERCHANT' ? 'MERCHANT' : 'CUSTOMER';

  const [form, setForm] = useState({ phone: '', name: '', password: '', role: initialRole });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  // Location state
  const [districts, setDistricts] = useState([]);
  const [mandals, setMandals]     = useState([]);
  const [villages, setVillages]   = useState([]);
  const [districtId, setDistrictId] = useState('');
  const [mandalId, setMandalId]     = useState('');
  const [villageId, setVillageId]   = useState('');
  const [villageName, setVillageName] = useState('');
  const [locLoading, setLocLoading]       = useState(true);
  const [mandalsLoading, setMandalsLoading] = useState(false);
  const [villagesLoading, setVillagesLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Fetch districts on mount
  useEffect(() => {
    fetch(`${LOC_API}/districts`)
      .then(r => r.json())
      .then(d => setDistricts(d.data || []))
      .catch(() => {})
      .finally(() => setLocLoading(false));
  }, []);

  // Fetch mandals when district changes
  useEffect(() => {
    if (!districtId) { setMandals([]); setMandalId(''); setVillages([]); setVillageId(''); return; }
    setMandalsLoading(true);
    setMandalId(''); setVillages([]); setVillageId('');
    fetch(`${LOC_API}/districts/${districtId}/mandals`)
      .then(r => r.json())
      .then(d => setMandals(d.data || []))
      .catch(() => setMandals([]))
      .finally(() => setMandalsLoading(false));
  }, [districtId]);

  // Fetch villages when mandal changes
  useEffect(() => {
    if (!mandalId) { setVillages([]); setVillageId(''); return; }
    setVillagesLoading(true);
    setVillageId('');
    fetch(`${LOC_API}/mandals/${mandalId}/villages`)
      .then(r => r.json())
      .then(d => setVillages(d.data || []))
      .catch(() => setVillages([]))
      .finally(() => setVillagesLoading(false));
  }, [mandalId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (name === 'phone') {
      if (value && !/^\d*$/.test(value)) { setPhoneError('Only numbers allowed'); return; }
      setPhoneError('');
    }
  };

  const handleVillageChange = (e) => {
    const id = e.target.value;
    setVillageId(id);
    const v = villages.find(v => String(v.id) === String(id));
    setVillageName(v ? v.name : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!districtId) { toast.error('Please select a district'); return; }
    if (!mandalId)   { toast.error('Please select a mandal'); return; }
    if (!villageId)  { toast.error('Please select a village / town'); return; }
    if (!form.phone.trim() || !/^\d+$/.test(form.phone)) { toast.error('Enter a valid phone number (digits only)'); return; }
    if (form.name.trim().length < 3) { toast.error('Username must be at least 3 characters'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }

    setLoading(true);
    try {
      const res = await API.post('/auth/register', form);
      const { token, ...userData } = res.data.data;
      login(userData, token);
      // Save location to localStorage so home page is pre-filtered
      localStorage.setItem('location', JSON.stringify({ name: villageName, id: villageId }));
      toast.success('Welcome to Local Connect!');
      if (userData.role === 'MERCHANT') navigate('/merchant/add-shop');
      else navigate('/home');
    } catch (err) {
      if (err.code === 'ECONNABORTED' || !err.response) {
        toast.error('Server is waking up — please wait 30 seconds and try again.');
      } else {
        const msg = err.response?.data?.message || '';
        if (msg.toLowerCase().includes('phone') || msg.toLowerCase().includes('duplicate')) {
          toast.error('This phone number is already registered. Please login instead.');
        } else {
          toast.error(msg || 'Registration failed. Please try again.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const pwStrength = form.password.length >= 8 ? { label: 'Strong', color: '#1E7B3B', bars: 4 }
    : form.password.length >= 6 ? { label: 'Good', color: '#F59E0B', bars: 2 }
    : { label: 'Too short (min 6)', color: '#EF4444', bars: 1 };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #0F172A 0%, #1a2744 45%, #1E7B3B 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '24px 20px',
      fontFamily: "'Inter', -apple-system, sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,123,59,.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -80, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <button onClick={() => navigate('/')}
        style={{ position: 'absolute', top: 20, left: 20, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', borderRadius: 10, padding: '8px 14px', color: 'rgba(255,255,255,.7)', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
        ← Back
      </button>

      <div style={{ textAlign: 'center', marginBottom: 24, position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12, filter: 'drop-shadow(0 4px 16px rgba(0,0,0,.4))' }}><Logo /></div>
        <div style={{ fontSize: 24, fontWeight: 900, color: 'white', letterSpacing: '-0.5px', marginBottom: 4 }}>Local Connect</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', fontWeight: 500 }}>One Place for Everything</div>
      </div>

      <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 10, background: 'white', borderRadius: 24, padding: '32px 28px', boxShadow: '0 24px 80px rgba(0,0,0,.4)' }}>

        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.3px', marginBottom: 4 }}>Create account ✨</div>
          <div style={{ fontSize: 13, color: '#94A3B8' }}>Join your community on Local Connect</div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Role */}
          <div>
            <label style={lbl}>I am a</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {roles.map(r => (
                <button key={r.id} type="button" onClick={() => setForm(f => ({ ...f, role: r.id }))}
                  style={{
                    padding: '12px 10px', borderRadius: 12, fontFamily: 'inherit', cursor: 'pointer', textAlign: 'center',
                    border: form.role === r.id ? '2px solid #1E7B3B' : '2px solid #E2E8F0',
                    background: form.role === r.id ? '#F0FDF4' : 'white',
                    boxShadow: form.role === r.id ? '0 0 0 3px rgba(30,123,59,.1)' : 'none',
                    transition: 'all .15s',
                  }}>
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{r.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: form.role === r.id ? '#1E7B3B' : '#0F172A' }}>{r.label}</div>
                  <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>{r.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* State — read only */}
          <div>
            <label style={lbl}>State</label>
            <div style={{ ...inp, display: 'flex', alignItems: 'center', gap: 8, background: '#F0FDF4', border: '1.5px solid #A7F3D0', color: '#1E7B3B', fontWeight: 700 }}>
              <span style={{ fontSize: 16 }}>📍</span> Andhra Pradesh
            </div>
          </div>

          {/* District */}
          <div>
            <label style={lbl}>District</label>
            <select value={districtId} onChange={e => setDistrictId(e.target.value)}
              style={{ ...sel, borderColor: districtId ? '#1E7B3B' : '#E2E8F0', background: districtId ? 'white' : '#F8FAFC' }}
              onFocus={focus} onBlur={blur}>
              <option value="">{locLoading ? 'Loading districts...' : 'Select District'}</option>
              {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>

          {/* Mandal */}
          <div>
            <label style={lbl}>Mandal</label>
            <select value={mandalId} onChange={e => setMandalId(e.target.value)}
              disabled={!districtId || mandals.length === 0}
              style={{ ...sel, borderColor: mandalId ? '#1E7B3B' : '#E2E8F0', background: mandalId ? 'white' : '#F8FAFC', opacity: !districtId ? 0.55 : 1 }}
              onFocus={focus} onBlur={blur}>
              <option value="">{!districtId ? 'Select district first' : mandalsLoading ? 'Loading mandals...' : mandals.length === 0 ? 'No mandals — try another district' : 'Select Mandal'}</option>
              {mandals.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>

          {/* Village */}
          <div>
            <label style={lbl}>Village / Town</label>
            <select value={villageId} onChange={handleVillageChange}
              disabled={!mandalId || villages.length === 0}
              style={{ ...sel, borderColor: villageId ? '#1E7B3B' : '#E2E8F0', background: villageId ? 'white' : '#F8FAFC', opacity: !mandalId ? 0.55 : 1 }}
              onFocus={focus} onBlur={blur}>
              <option value="">{!mandalId ? 'Select mandal first' : villagesLoading ? 'Loading villages...' : villages.length === 0 ? 'No villages — try another mandal' : 'Select Village / Town'}</option>
              {villages.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
            {villageName && (
              <div style={{ fontSize: 11, color: '#1E7B3B', marginTop: 5, fontWeight: 600 }}>📍 {villageName}, Andhra Pradesh</div>
            )}
          </div>

          {/* Phone */}
          <div>
            <label style={lbl}>Phone Number</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: '#64748B', fontWeight: 600 }}>+91</div>
              <input
                type="tel" name="phone" value={form.phone}
                onChange={handleChange} placeholder="10-digit mobile number" required maxLength={10}
                style={{ ...inp, paddingLeft: 46, borderColor: phoneError ? '#EF4444' : '#E2E8F0' }}
                onFocus={focus} onBlur={blur}
              />
            </div>
            {phoneError && <div style={{ fontSize: 11, color: '#EF4444', marginTop: 4, fontWeight: 600 }}>{phoneError}</div>}
          </div>

          {/* Username */}
          <div>
            <label style={lbl}>Username</label>
            <input
              type="text" name="name" value={form.name}
              onChange={handleChange} placeholder="Choose a username (min 3 chars)" required
              style={inp} onFocus={focus} onBlur={blur}
            />
            <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 4 }}>This is how you'll login and appear on Local Connect</div>
          </div>

          {/* Password */}
          <div>
            <label style={lbl}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={show ? 'text' : 'password'} name="password" value={form.password}
                onChange={handleChange} placeholder="Min 6 characters" required
                style={{ ...inp, paddingRight: 46 }}
                onFocus={focus} onBlur={blur}
              />
              <button type="button" onClick={() => setShow(!show)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#94A3B8' }}>
                {show ? '🙈' : '👁'}
              </button>
            </div>
            {form.password.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                  {[1,2,3,4].map(i => (
                    <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= pwStrength.bars ? pwStrength.color : '#E2E8F0', transition: 'background .2s' }} />
                  ))}
                </div>
                <div style={{ fontSize: 10, color: pwStrength.color, fontWeight: 600 }}>{pwStrength.label}</div>
              </div>
            )}
          </div>

          <button type="submit" disabled={loading}
            style={{
              width: '100%', padding: '14px', borderRadius: 14, border: 'none',
              background: loading ? '#94A3B8' : 'linear-gradient(135deg, #1E7B3B, #2F855A)',
              color: 'white', fontWeight: 800, fontSize: 15,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 6px 20px rgba(30,123,59,.4)',
              fontFamily: 'inherit', marginTop: 4,
            }}>
            {loading ? 'Creating account...' : "Create Account — It's Free →"}
          </button>
        </form>

        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#CBD5E1', lineHeight: 1.5 }}>By signing up you agree to our Terms of Service</div>
        </div>

        <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid #F1F5F9', textAlign: 'center' }}>
          <span style={{ fontSize: 14, color: '#94A3B8' }}>Already have an account? </span>
          <Link to="/login" style={{ fontSize: 14, fontWeight: 700, color: '#1E7B3B', textDecoration: 'none' }}>Login →</Link>
        </div>
      </div>

      <div style={{ marginTop: 24, fontSize: 11, color: 'rgba(255,255,255,.25)', fontWeight: 600, textAlign: 'center', position: 'relative', zIndex: 10 }}>
        Discover · Connect · Grow
      </div>
    </div>
  );
};

export default RegisterPage;
