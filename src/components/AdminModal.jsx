import React, { useState, useEffect } from 'react';

const AdminModal = ({ isOpen, onClose, title, fields, initialData, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      const emptyData = {};
      fields.forEach(field => {
        emptyData[field.name] = '';
      });
      setFormData(emptyData);
    }
  }, [initialData, fields, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="clay-card" style={{ width: '400px', background: 'var(--bg-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, color: 'var(--primary)' }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>&times;</button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {fields.map(field => (
            <div key={field.name} className="admin-input-group" style={{ marginBottom: 0 }}>
              <label>{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea name={field.name} value={formData[field.name] || ''} onChange={handleChange} />
              ) : field.type === 'file' ? (
                <div>
                  <input type="file" accept="image/*" onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const data = new FormData();
                    data.append('file', file);
                    try {
                      const res = await fetch('/api/upload', { method: 'POST', body: data });
                      if (res.ok) {
                        const json = await res.json();
                        setFormData(prev => ({ ...prev, [field.name]: json.url }));
                      }
                    } catch (err) { console.error('Upload failed', err); }
                  }} />
                  {formData[field.name] && <img src={formData[field.name]} alt="Preview" style={{ width: '80px', height: '80px', objectFit: 'cover', marginTop: '8px', borderRadius: '4px' }} />}
                </div>
              ) : (
                <input type={field.type || 'text'} name={field.name} value={formData[field.name] || ''} onChange={handleChange} />
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
          <button className="btn admin-btn-outline" onClick={onClose} style={{ padding: '8px 16px' }}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave} style={{ padding: '8px 16px' }}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
