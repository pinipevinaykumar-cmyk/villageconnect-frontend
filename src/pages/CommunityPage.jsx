import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const POSTS = [
  { id: 1, type: 'blood',        icon: '🩸', title: 'Urgent: B+ Blood Needed',  body: 'Patient at GGH Hospital needs B+ blood urgently. Contact: 9876543210', time: '2 min ago',   badge: 'Urgent',      badgeColor: '#FEE2E2', badgeText: '#DC2626', author: 'Admin' },
  { id: 2, type: 'announcement', icon: '📢', title: 'Road Closure — MG Road',   body: 'MG Road will be closed from Monday to Friday for maintenance work. Use alternate routes.', time: '1 hour ago',  badge: 'Alert',       badgeColor: '#FEF3C7', badgeText: '#D97706', author: 'Municipality' },
  { id: 3, type: 'volunteer',    icon: '🤝', title: 'Cleanliness Drive Sunday',  body: 'Join us for a community cleanliness drive at Town Park on Sunday, 7:00 AM onwards.', time: '3 hours ago', badge: 'Volunteer',    badgeColor: '#EFF6FF', badgeText: '#3B82F6', author: 'Resident Welfare' },
  { id: 4, type: 'lost',         icon: '🐕', title: 'Lost Dog — Park Lane Area', body: 'Golden retriever lost near Park Lane. Answers to "Bruno". Please call if found: 9123456789', time: '5 hours ago', badge: 'Lost & Found', badgeColor: '#F0FDF4', badgeText: '#15803D', author: 'Priya S.' },
  { id: 5, type: 'announcement', icon: '🎉', title: 'Village Festival — Oct 15', body: 'Annual village festival at Town Ground. Cultural programs, food stalls, and fun activities for all ages.', time: 'Yesterday',   badge: 'Event',       badgeColor: '#F5F3FF', badgeText: '#7C3AED', author: 'Cultural Committee' },
];

const FILTER_TABS = [
  { label: 'All',           type: null },
  { label: 'Blood Requests', type: 'blood' },
  { label: 'Announcements', type: 'announcement' },
  { label: 'Volunteer',     type: 'volunteer' },
  { label: 'Lost & Found',  type: 'lost' },
];

const CommunityPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(null);

  const displayed = activeFilter ? POSTS.filter(p => p.type === activeFilter) : POSTS;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 100 }}>

      {/* HEADER */}
      <div style={{ background: 'linear-gradient(160deg, #1E7B3B 0%, #2F855A 100%)', padding: '52px 18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => navigate(-1)}
            style={{ background: 'rgba(255,255,255,.15)', border: 'none', borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ArrowLeft size={18} color="white" />
          </button>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'white' }}>Community</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.65)' }}>Local updates & announcements</div>
          </div>
        </div>
      </div>

      {/* FILTER TABS */}
      <div style={{ padding: '14px 16px 0' }}>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }} className="scroll-hide">
          {FILTER_TABS.map(tab => {
            const isActive = activeFilter === tab.type;
            return (
              <button key={tab.label} onClick={() => setActiveFilter(tab.type)}
                style={{
                  flexShrink: 0, padding: '8px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                  background: isActive ? 'var(--primary)' : 'var(--card)',
                  color: isActive ? 'white' : 'var(--text-2)',
                  border: isActive ? 'none' : '1.5px solid var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                }}>
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* POSTS */}
      <div style={{ padding: '14px 16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {displayed.map(post => (
          <div key={post.id} style={{
            background: 'var(--card)', borderRadius: 16, padding: '16px',
            border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span style={{ fontSize: 28, flexShrink: 0, lineHeight: 1 }}>{post.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', flex: 1 }}>{post.title}</div>
                  <span style={{ flexShrink: 0, fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 100, background: post.badgeColor, color: post.badgeText }}>{post.badge}</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {post.body}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600 }}>{post.author}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{post.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {displayed.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 24px', background: 'var(--card)', borderRadius: 16, border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📢</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>No posts in this category</div>
          </div>
        )}
      </div>

      {/* FLOATING POST BUTTON */}
      <button
        onClick={() => toast('Community posting coming in V2 🚀', { icon: '✨', style: { fontFamily: 'Inter, sans-serif', fontWeight: 600 } })}
        style={{
          position: 'fixed', bottom: 80, right: 20,
          background: 'linear-gradient(135deg, #1E7B3B, #2F855A)',
          color: 'white', border: 'none', borderRadius: '50%',
          width: 56, height: 56, fontSize: 24, cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(30,123,59,.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 50,
        }}>
        ➕
      </button>
    </div>
  );
};

export default CommunityPage;
