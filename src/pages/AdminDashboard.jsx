import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import AdminModal from '../components/AdminModal';
import { User, Folder, Code2, Briefcase, Award, Palette, Link as LinkIcon, Edit2, Trash2, Plus, Upload, CheckCircle2 } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { data, updateData, updateRootData, addArrayItem, updateArrayItem, deleteArrayItem } = usePortfolio();
  
  const [modalState, setModalState] = useState({ isOpen: false, type: null, data: null });

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/login');
    }
  }, [navigate]);

  const handleHeroChange = (e) => {
    updateData('hero', { [e.target.name]: e.target.value });
  };

  const handleAboutMeChange = (e) => {
    updateData('aboutMe', { [e.target.name]: e.target.value });
  };

  const handleStatChange = (e) => {
    updateData('stats', { [e.target.name]: e.target.value });
  };

  const openModal = (type, initialData = null) => {
    setModalState({ isOpen: true, type, data: initialData });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null, data: null });
  };

  const handleModalSave = (formData) => {
    let processedData = { ...formData };
    
    // Process comma separated fields
    if (modalState.type === 'projects' && typeof processedData.tags === 'string') {
      processedData.tags = processedData.tags.split(',').map(t => t.trim()).filter(Boolean);
    }

    if (modalState.data) {
      updateArrayItem(modalState.type, modalState.data.id, processedData);
    } else {
      addArrayItem(modalState.type, processedData);
    }
  };

  const getModalConfig = () => {
    switch (modalState.type) {
      case 'projects':
        return {
          title: 'Project',
          fields: [
            { name: 'title', label: 'Title' },
            { name: 'desc', label: 'Description', type: 'textarea' },
            { name: 'tags', label: 'Tags (comma separated)' },
            { name: 'img', label: 'Image', type: 'file' }
          ]
        };
      case 'experience':
        return {
          title: 'Experience',
          fields: [
            { name: 'role', label: 'Role' },
            { name: 'company', label: 'Company' },
            { name: 'date', label: 'Date Range' },
            { name: 'color', label: 'Hex Color Code (e.g. #F7B565)' }
          ]
        };
      case 'skills':
        return {
          title: 'Skill',
          fields: [
            { name: 'name', label: 'Skill Name' },
            { name: 'percent', label: 'Percentage (e.g. 80%)' },
            { name: 'color', label: 'Color / Gradient' }
          ]
        };
      case 'certificates':
        return {
          title: 'Certificate',
          fields: [
            { name: 'name', label: 'Certificate Name' },
            { name: 'color', label: 'Background Color (Hex)' }
          ]
        };
      case 'socialLinks':
        return {
          title: 'Social Link',
          fields: [
            { name: 'platform', label: 'Platform (e.g. GitHub)' },
            { name: 'url', label: 'URL' },
            { name: 'color', label: 'Background Color (Hex)' }
          ]
        };
      default:
        return { title: '', fields: [] };
    }
  };

  const handlePhotoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('file', file);
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        if (res.ok) {
          const json = await res.json();
          updateData('hero', { avatarImg: json.url });
        }
      } catch (err) {
        console.error('Failed to upload avatar', err);
      }
    };
    input.click();
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      
      <main className="admin-main">
        <AdminHeader />
        
        <div className="admin-content">
          
          {/* TOP ROW: Banner (spans 2) + Live Status (spans 1) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', gridColumn: 'span 2' }}>
            {/* Welcome Banner */}
            <div className="admin-welcome-banner">
              <img src={data.hero.avatarImg} alt={data.hero.name} />
              <div>
                <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', color: 'var(--text-dark)' }}>Welcome Back, {data.hero.name.split(' ')[0]}! 👋</h1>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '13px' }}>Manage your portfolio content, update your information and see the changes live.</p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="admin-stats-row">
              <div className="admin-stat-card">
                <div className="admin-stat-icon" style={{ background: '#F4EFFF', color: '#A181FF' }}><Folder size={16} /></div>
                <p>Total Projects</p>
                <h4>{data.stats.projectsCompleted}</h4>
                <span style={{ fontSize: '10px', color: '#4CAF50' }}>↑ 2 new</span>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-icon" style={{ background: '#FCEEF5', color: '#F98FB9' }}><Briefcase size={16} /></div>
                <p>Experience</p>
                <h4>{data.stats.yearsExperience}</h4>
                <span style={{ fontSize: '10px', color: '#4CAF50' }}>↑ 1 updated</span>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-icon" style={{ background: '#FEF6EC', color: '#F7B565' }}><User size={16} /></div>
                <p>Happy Clients</p>
                <h4>{data.stats.happyClients}</h4>
                <span style={{ fontSize: '10px', color: '#4CAF50' }}>↑ 3 new</span>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-icon" style={{ background: '#EEF6FE', color: '#6BB5F6' }}><Award size={16} /></div>
                <p>Certificates</p>
                <h4>{data.stats.certifications}</h4>
                <span style={{ fontSize: '10px', color: '#4CAF50' }}>↑ 1 new</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Live Portfolio Status */}
            <div className="clay-card" style={{ height: '100%' }}>
              <div className="admin-card-header" style={{ marginBottom: '12px' }}>
                <h3 style={{ fontSize: '14px' }}>Live Portfolio Status</h3>
                <span style={{ fontSize: '10px', color: '#4CAF50', display: 'flex', alignItems: 'center', gap: '4px', background: '#E8F5E9', padding: '2px 8px', borderRadius: '12px' }}>• Live</span>
              </div>
              <div style={{ background: 'var(--bg-color)', height: '120px', borderRadius: '8px', marginBottom: '12px', border: '1px solid #ddd' }}>
                 <div style={{ padding: '10px' }}>
                    <div style={{ width: '100%', height: '20px', background: '#DED1F9', borderRadius: '4px', marginBottom: '8px' }}></div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ width: '30%', height: '60px', background: 'white', borderRadius: '4px' }}></div>
                      <div style={{ width: '70%', height: '60px', background: 'white', borderRadius: '4px' }}></div>
                    </div>
                 </div>
              </div>
              <p style={{ fontSize: '10px', color: '#4CAF50', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}><CheckCircle2 size={12}/> Changes are published immediately</p>
              <button className="admin-btn-small admin-btn-outline" style={{ width: '100%', justifyContent: 'center', padding: '8px' }} onClick={() => window.open('/', '_blank')}>View Portfolio ↗</button>
            </div>
          </div>

          {/* COLUMN 1: Personal Info, About Me */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Personal Information */}
            <div className="clay-card">
              <div className="admin-card-header">
                <h3><User size={16} color="#A181FF" /> Personal Information</h3>
                <button className="admin-btn-small"><Edit2 size={12}/> Update</button>
              </div>
              
              <div className="admin-input-group">
                <label>Name</label>
                <input type="text" name="name" value={data.hero.name} onChange={handleHeroChange} />
              </div>
              <div className="admin-input-group">
                <label>Role</label>
                <input type="text" name="role" value={data.hero.role} onChange={handleHeroChange} />
              </div>
              <div className="admin-input-group">
                <label>Bio</label>
                <textarea name="bio" value={data.hero.bio} onChange={handleHeroChange}></textarea>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
                <img src={data.hero.avatarImg} alt="Avatar" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <button className="admin-btn-small admin-btn-outline" onClick={handlePhotoUpload} style={{ width: 'fit-content' }}><Upload size={12}/> Change Photo</button>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Recommended size: 400x400px</span>
                </div>
              </div>
            </div>

                {/* About Me Details */}
                <div className="clay-card">
                  <div className="admin-card-header">
                    <h3><User size={16} color="#A181FF" /> About Me</h3>
                  </div>
                  <div className="admin-input-group">
                    <label>Location</label>
                    <input type="text" name="location" value={data.aboutMe.location} onChange={handleAboutMeChange} />
                  </div>
                  <div className="admin-input-group">
                    <label>Email</label>
                    <input type="text" name="email" value={data.aboutMe.email} onChange={handleAboutMeChange} />
                  </div>
                  <div className="admin-input-group">
                    <label>Age</label>
                    <input type="text" name="age" value={data.aboutMe.age} onChange={handleAboutMeChange} />
                  </div>
                  <div className="admin-input-group">
                    <label>Education</label>
                    <textarea name="education" value={data.aboutMe.education} onChange={handleAboutMeChange} style={{ minHeight: '60px' }}></textarea>
                  </div>
                </div>
          </div>

          {/* COLUMN 2: Projects, Skills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Projects Management */}
            <div className="clay-card">
              <div className="admin-card-header">
                <h3><Folder size={16} color="#A181FF" /> Projects Management</h3>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-dark)', fontWeight: 'bold' }}>• {data.projects.length} projects</span>
                <span onClick={() => openModal('projects')} style={{ fontSize: '12px', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><Plus size={12}/> Add New</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {data.projects.map(proj => (
                  <div className="admin-list-item" key={proj.id}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={proj.img} alt={proj.title} style={{ width: '40px', height: '30px', borderRadius: '4px', objectFit: 'cover' }} />
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-dark)' }}>{proj.title}</span>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Web App</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ fontSize: '10px', color: '#4CAF50', display: 'flex', alignItems: 'center', gap: '4px', background: '#E8F5E9', padding: '2px 6px', borderRadius: '4px' }}><CheckCircle2 size={10}/> Published</span>
                      <Edit2 size={14} color="var(--primary)" style={{ cursor: 'pointer' }} onClick={() => openModal('projects', proj)} />
                      <Trash2 size={14} color="#FF4757" style={{ cursor: 'pointer' }} onClick={() => deleteArrayItem('projects', proj.id)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Management */}
            <div className="clay-card">
              <div className="admin-card-header">
                <h3><Code2 size={16} color="#A181FF" /> Skills Management</h3>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-dark)', fontWeight: 'bold', display: 'block', marginBottom: '16px' }}>• {data.skills.length} skills</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {data.skills.map(skill => (
                  <div key={skill.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'bold' }}>
                      <span>{skill.name}</span>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span>{skill.percent}</span>
                        <Edit2 size={12} color="var(--primary)" style={{ cursor: 'pointer' }} onClick={() => openModal('skills', skill)} />
                        <Trash2 size={12} color="#FF4757" style={{ cursor: 'pointer' }} onClick={() => deleteArrayItem('skills', skill.id || skill.name)} />
                      </div>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: '#eee', borderRadius: '3px' }}>
                      <div style={{ width: skill.percent, height: '100%', background: skill.color, borderRadius: '3px' }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="admin-btn-small admin-btn-outline" onClick={() => openModal('skills')} style={{ width: '100%', justifyContent: 'center', marginTop: '16px', padding: '8px' }}><Plus size={14}/> Add Skill</button>
            </div>

            {/* Social Links */}
            <div className="clay-card">
              <div className="admin-card-header">
                <h3><LinkIcon size={16} color="#A181FF" /> Social Links</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {data.socialLinks?.map(link => (
                  <div key={link.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-color)', padding: '8px', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: link.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={12} color="var(--primary)"/></div>
                      <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{link.platform}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Edit2 size={12} color="var(--primary)" style={{ cursor: 'pointer' }} onClick={() => openModal('socialLinks', link)} />
                      <Trash2 size={12} color="#FF4757" style={{ cursor: 'pointer' }} onClick={() => deleteArrayItem('socialLinks', link.id)} />
                    </div>
                  </div>
                ))}
              </div>
              <button className="admin-btn-small admin-btn-outline" onClick={() => openModal('socialLinks')} style={{ width: '100%', justifyContent: 'center', marginTop: '16px', padding: '8px' }}><Plus size={14}/> Add Social Link</button>
            </div>

          </div>

          {/* COLUMN 3: Quick Actions, Experience, Certificates, Theme */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Quick Actions */}
            <div className="clay-card">
              <h3 style={{ fontSize: '14px', marginBottom: '16px' }}>Quick Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <div style={{ background: '#F4EFFF', padding: '8px', borderRadius: '8px' }}><Folder size={16} color="#A181FF"/></div>
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-dark)' }}>Add New Project</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Create and manage your projects</span>
                  </div>
                  <span style={{ color: 'var(--text-muted)' }}>›</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <div style={{ background: '#E8F5E9', padding: '8px', borderRadius: '8px' }}><User size={16} color="#4CAF50"/></div>
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-dark)' }}>Update About Me</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Edit your personal information</span>
                  </div>
                  <span style={{ color: 'var(--text-muted)' }}>›</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <div style={{ background: '#FCEEF5', padding: '8px', borderRadius: '8px' }}><Award size={16} color="#F98FB9"/></div>
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-dark)' }}>Add Certificate</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Add your latest certifications</span>
                  </div>
                  <span style={{ color: 'var(--text-muted)' }}>›</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <div style={{ background: '#FEF6EC', padding: '8px', borderRadius: '8px' }}><Code2 size={16} color="#F7B565"/></div>
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-dark)' }}>Manage Skills</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Update your technical skills</span>
                  </div>
                  <span style={{ color: 'var(--text-muted)' }}>›</span>
                </div>

              </div>
            </div>

            {/* Experience Management */}
            <div className="clay-card">
              <div className="admin-card-header">
                <h3><Briefcase size={16} color="#A181FF" /> Experience Management</h3>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-dark)', fontWeight: 'bold', display: 'block', marginBottom: '16px' }}>• {data.stats.yearsExperience} years experience</span>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {data.experience.map(exp => (
                  <div className="admin-list-item" key={exp.id}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#FEF6EC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <Briefcase size={16} color="#F7B565" />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-dark)' }}>{exp.role}</span>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{exp.company}</span>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{exp.date}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <Edit2 size={14} color="var(--primary)" style={{ cursor: 'pointer' }} onClick={() => openModal('experience', exp)} />
                      <Trash2 size={14} color="#FF4757" style={{ cursor: 'pointer' }} onClick={() => deleteArrayItem('experience', exp.id)} />
                    </div>
                  </div>
                ))}
              </div>
              <button className="admin-btn-small admin-btn-outline" onClick={() => openModal('experience')} style={{ width: '100%', justifyContent: 'center', marginTop: '16px', padding: '8px' }}><Plus size={14}/> Add Experience</button>
            </div>

            {/* Certificates Management */}
            <div className="clay-card">
              <div className="admin-card-header">
                <h3><Award size={16} color="#A181FF" /> Certificates Management</h3>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-dark)', fontWeight: 'bold', display: 'block', marginBottom: '16px' }}>• {data.certificates?.length || 0} certificates</span>
              
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {data.certificates?.map(cert => (
                  <div key={cert.id} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: cert.color || '#F4EFFF', padding: '4px 8px', borderRadius: '12px' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-dark)' }}>{cert.name}</span>
                    <Edit2 size={10} style={{ cursor: 'pointer', marginLeft: '4px' }} onClick={() => openModal('certificates', cert)} />
                    <Trash2 size={10} color="#FF4757" style={{ cursor: 'pointer' }} onClick={() => deleteArrayItem('certificates', cert.id)} />
                  </div>
                ))}
              </div>
              <button className="admin-btn-small admin-btn-outline" onClick={() => openModal('certificates')} style={{ width: '100%', justifyContent: 'center', marginTop: '16px', padding: '8px' }}><Plus size={14}/> Add Certificate</button>
            </div>

            {/* Theme & Appearance */}
            <div className="clay-card">
              <div className="admin-card-header">
                <h3><Palette size={16} color="#A181FF" /> Theme & Appearance</h3>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '12px' }}>Choose your preferred theme</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className={`admin-btn-small ${data.theme !== 'light' ? 'admin-btn-outline' : ''}`} 
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => updateRootData('theme', 'light')}
                >☀ Light</button>
                <button 
                  className={`admin-btn-small ${data.theme !== 'dark' ? 'admin-btn-outline' : ''}`} 
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => updateRootData('theme', 'dark')}
                >☾ Dark</button>
              </div>
            </div>

          </div>

        </div>
      </main>

      <AdminModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={`Add/Edit ${getModalConfig().title}`}
        fields={getModalConfig().fields}
        initialData={modalState.data}
        onSave={handleModalSave}
      />
    </div>
  );
};

export default AdminDashboard;
