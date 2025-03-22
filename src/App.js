import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [benefits, setBenefits] = useState(['']);
  const [audience, setAudience] = useState('');
  const [brandVoice, setBrandVoice] = useState('Professional');
  const [platforms, setPlatforms] = useState([]);
  const [charLimit, setCharLimit] = useState(280);
  const [adCopies, setAdCopies] = useState([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [authError, setAuthError] = useState('');
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  // Ref for results container to scroll to
  const resultsRef = useRef(null);

  const brandVoiceOptions = ['Professional', 'Friendly', 'Bold', 'Humorous', 'Luxurious'];
  const platformOptions = ['Facebook', 'Instagram', 'Twitter', 'LinkedIn'];

  // Auto-scroll to results when adCopies changes
  useEffect(() => {
    if (adCopies.length > 0 && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [adCopies]);

  const handleAddBenefit = () => {
    setBenefits([...benefits, '']);
  };

  const handleRemoveBenefit = (index) => {
    const newBenefits = benefits.filter((_, i) => i !== index);
    setBenefits(newBenefits);
  };

  const handlePlatformToggle = (platform) => {
    if (platforms.includes(platform)) {
      setPlatforms(platforms.filter(p => p !== platform));
    } else {
      setPlatforms([...platforms, platform]);
    }
  };

  const handleGenerate = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newAdCopies = [
        {
          id: '1',
          platform: 'Facebook',
          content: 'Transform your digital presence with AdVerve\'s AI-powered copywriting. Create compelling ads that convert in seconds. Try it now!',
        },
        {
          id: '2',
          platform: 'Instagram',
          content: '🚀 Elevate your brand voice with AI precision. AdVerve: Where creativity meets conversion. #DigitalMarketing #AI',
        },
        {
          id: '3',
          platform: 'LinkedIn',
          content: 'Revolutionize your ad strategy with AdVerve. Our AI technology delivers data-driven copy that speaks to your audience. Book a demo today.',
        },
      ];
      setAdCopies(newAdCopies);
      setLoading(false);
    }, 1500);
  };

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 2000);
  };

  const handleAuth = (e) => {
    e.preventDefault();
    setAuthError('');

    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      setAuthError('Please fill in all fields');
      return;
    }

    if (isLogin) {
      // Simulate login
      setUser({
        email: formData.email,
        password: formData.password,
      });
    } else {
      // Simulate registration
      setUser({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });
    }

    setShowAuthModal(false);
    setFormData({ email: '', password: '', name: '' });
  };

  const handleLogout = () => {
    setUser(null);
    setAdCopies([]);
  };

  return (
    <div className="app-container">
      <header>
        <div className="header-content">
          <div className="logo-container">
            <h1 className="app-title">AdVerve</h1>
            <p className="app-subtitle">AI-Powered Ad Copy Generation</p>
          </div>
          <div className="auth-container">
            {user ? (
              <div className="user-greeting">
                <span>Welcome, {user.name || user.email}</span>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            ) : (
              <button onClick={() => setShowAuthModal(true)} className="login-button">
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      <main>
        <div className="form-container">
          <h2 className="section-title">Generate Your Ad Copy</h2>
          <div className="form-grid">
            <div className="form-column">
              <div className="form-group">
                <label>Product/Service Name</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Enter your product name"
                />
              </div>

              <div className="form-group">
                <label>Product Description</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your product or service"
                />
              </div>

              <div className="form-group">
                <label>Key Features</label>
                {benefits.map((benefit, index) => (
                  <div key={index} className="benefit-input">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => {
                        const newBenefits = [...benefits];
                        newBenefits[index] = e.target.value;
                        setBenefits(newBenefits);
                      }}
                      placeholder={`Benefit ${index + 1}`}
                    />
                    {benefits.length > 1 && (
                      <button
                        onClick={() => handleRemoveBenefit(index)}
                        className="remove-benefit-button"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={handleAddBenefit}
                  className="add-benefit-button"
                >
                  Add Feature
                </button>
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label>Target Audience</label>
                <input
                  type="text"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="Define your target audience"
                />
              </div>

              <div className="form-group">
                <label>Tone</label>
                <div className="button-group">
                  {brandVoiceOptions.map((voice) => (
                    <button
                      key={voice}
                      onClick={() => setBrandVoice(voice)}
                      className={`voice-button ${brandVoice === voice ? 'selected' : ''}`}
                    >
                      {voice}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Platforms</label>
                <div className="button-group">
                  {platformOptions.map((platform) => (
                    <button
                      key={platform}
                      onClick={() => handlePlatformToggle(platform)}
                      className={`platform-button ${platforms.includes(platform) ? 'selected' : ''}`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Character Limit</label>
                <input
                  type="number"
                  value={charLimit}
                  onChange={(e) => setCharLimit(parseInt(e.target.value))}
                  min="1"
                  max="1000"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`generate-button ${loading ? 'loading' : ''}`}
          >
            {loading ? 'Generating...' : 'Generate Ad Copy'}
          </button>
        </div>

        {adCopies.length > 0 && (
          <div className="results-container" ref={resultsRef}>
            <h2 className="section-title">Generated Ad Copies</h2>
            <div className="ad-copies-grid">
              {adCopies.map((ad) => (
                <div key={ad.id} className="ad-copy-card">
                  <div className="ad-platform">
                    <span>{ad.platform}</span>
                  </div>
                  <p className="ad-content">{ad.content}</p>
                  <div className="ad-actions">
                    <button
                      onClick={() => copyToClipboard(ad.content)}
                      className="copy-button"
                    >
                      Copy
                    </button>
                    <button className="regenerate-button">
                      Regenerate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {showSuccessToast && (
        <div className="toast">
          Copied to clipboard!
        </div>
      )}

      {showAuthModal && (
        <div className="modal-overlay">
          <div className="auth-modal">
            <div className="modal-header">
              <h2>{isLogin ? 'Login' : 'Register'}</h2>
              <button
                onClick={() => setShowAuthModal(false)}
                className="close-modal-button"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAuth}>
              {!isLogin && (
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                  />
                </div>
              )}

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                />
              </div>

              {authError && (
                <div className="auth-error">
                  {authError}
                </div>
              )}

              <button type="submit" className="auth-submit-button">
                {isLogin ? 'Login' : 'Register'}
              </button>

              <div className="auth-toggle">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="auth-toggle-button"
                >
                  {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        /* General styles */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        
        .app-container {
          min-height: 100vh;
          background-color: #f5f5f5;
        }
        
        /* Header styles */
        header {
          background-color: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.5rem 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .app-title {
          font-size: 2rem;
          font-weight: bold;
          color: #3A86FF;
        }
        
        .app-subtitle {
          color: #666;
          margin-top: 0.5rem;
        }
        
        /* Auth styles */
        .user-greeting {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .login-button {
          padding: 0.5rem 1rem;
          background-color: #3A86FF;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .login-button:hover {
          background-color: #2678FF;
        }
        
        .logout-button {
          padding: 0.5rem 1rem;
          color: #ff3a3a;
          background-color: transparent;
          border: 1px solid #ff3a3a;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .logout-button:hover {
          background-color: #fff0f0;
          border-color: #ff1a1a;
          color: #ff1a1a;
        }
        
        /* Main content styles */
        main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        
        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }
        
        /* Form styles */
        .form-container {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          margin-bottom: 2rem;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #333;
          margin-bottom: 0.5rem;
        }
        
        .form-group input, 
        .form-group textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 1rem;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        
        .form-group input:focus, 
        .form-group textarea:focus {
          outline: none;
          border-color: #3A86FF;
          box-shadow: 0 0 0 2px rgba(58, 134, 255, 0.2);
        }
        
        .button-group {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
        }
        
        .voice-button, 
        .platform-button {
          padding: 0.75rem 0.5rem;
          border-radius: 5px;
          border: none;
          background-color: #f0f0f0;
          color: #333;
          cursor: pointer;
          text-align: center;
          transition: all 0.2s ease;
        }
        
        .voice-button:hover, 
        .platform-button:hover {
          background-color: #e0e0e0;
        }
        
        .voice-button.selected, 
        .platform-button.selected {
          background-color: #3A86FF;
          color: white;
        }
        
        .voice-button.selected:hover, 
        .platform-button.selected:hover {
          background-color: #2678FF;
        }
        
        .benefit-input {
          display: flex;
          margin-bottom: 0.5rem;
        }
        
        .remove-benefit-button {
          margin-left: 0.5rem;
          padding: 0 0.75rem;
          background-color: white;
          color: #ff3a3a;
          border: 1px solid #ff3a3a;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .remove-benefit-button:hover {
          background-color: #fff0f0;
          border-color: #ff1a1a;
          color: #ff1a1a;
        }
        
        .add-benefit-button {
          margin-top: 0.5rem;
          padding: 0.5rem 1rem;
          background-color: white;
          color: #3A86FF;
          border: 1px solid #3A86FF;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .add-benefit-button:hover {
          background-color: #f0f7ff;
          border-color: #2678FF;
          color: #2678FF;
        }
        
        .generate-button {
          width: 100%;
          margin-top: 1.5rem;
          padding: 0.75rem 1.5rem;
          background-color: #FF006E;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .generate-button:hover {
          background-color: #E00062;
        }
        
        .generate-button.loading {
          opacity: 0.75;
          cursor: wait;
        }
        
        /* Results styles */
        .results-container {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          scroll-margin-top: 2rem;
        }
        
        .ad-copies-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        
        .ad-copy-card {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 1.5rem;
          transition: box-shadow 0.2s ease;
        }
        
        .ad-copy-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .ad-platform {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .ad-platform span {
          font-weight: 500;
          margin-left: 0.5rem;
        }
        
        .ad-content {
          color: #333;
          margin-bottom: 1rem;
        }
        
        .ad-actions {
          display: flex;
          justify-content: space-between;
        }
        
        .copy-button, 
        .regenerate-button {
          padding: 0.5rem 1rem;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .copy-button {
          color: #3A86FF;
          background-color: white;
          border: 1px solid #3A86FF;
        }
        
        .copy-button:hover {
          background-color: #f0f7ff;
          border-color: #2678FF;
          color: #2678FF;
        }
        
        .regenerate-button {
          color: #FF006E;
          background-color: white;
          border: 1px solid #FF006E;
        }
        
        .regenerate-button:hover {
          background-color: #fff0f5;
          border-color: #E00062;
          color: #E00062;
        }
        
        /* Toast notification */
        .toast {
          position: fixed;
          bottom: 1rem;
          right: 1rem;
          background-color: #4CAF50;
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 5px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          animation: fadeIn 0.3s, fadeOut 0.3s 1.7s;
          z-index: 1000;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(20px); }
        }
        
        /* Modal styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }
        
        .auth-modal {
          background-color: white;
          border-radius: 8px;
          padding: 2rem;
          max-width: 400px;
          width: 100%;
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .close-modal-button {
          background: none;
          border: none;
          font-size: 1.25rem;
          color: #666;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        
        .close-modal-button:hover {
          color: #333;
        }
        
        .auth-error {
          margin-bottom: 1rem;
          color: #ff3a3a;
          font-size: 0.875rem;
        }
        
        .auth-submit-button {
          width: 100%;
          padding: 0.75rem 1rem;
          background-color: #3A86FF;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .auth-submit-button:hover {
          background-color: #2678FF;
        }
        
        .auth-toggle {
          margin-top: 1rem;
          text-align: center;
        }
        
        .auth-toggle-button {
          background: none;
          border: none;
          color: #3A86FF;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        
        .auth-toggle-button:hover {
          color: #2678FF;
          text-decoration: underline;
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .ad-copies-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default App;