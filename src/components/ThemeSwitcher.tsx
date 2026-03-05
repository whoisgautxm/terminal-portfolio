import { useState } from 'react';
import { useTheme, type ThemeName } from '../context/ThemeContext';
import { Monitor, Terminal, Palette } from 'lucide-react';

export function ThemeSwitcher() {
    const { theme, setTheme, crtEnabled, setCrtEnabled, matrixEnabled, setMatrixEnabled } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const themes: { id: ThemeName; label: string; color: string }[] = [
        { id: 'hack', label: 'Hack (Green)', color: '#00ff41' },
        { id: 'dracula', label: 'Dracula', color: '#ff79c6' },
        { id: 'cyberpunk', label: 'Cyberpunk', color: '#fcee0a' },
        { id: 'synthwave', label: 'Synthwave', color: '#ff1c9b' },
        { id: 'light', label: 'Light Mode', color: '#00796b' },
    ];

    return (
        <div className="theme-switcher-container">
            <button
                className="theme-switcher-btn"
                onClick={() => setIsOpen(!isOpen)}
                title="Display Settings"
            >
                <Palette size={20} />
            </button>

            {isOpen && (
                <div className="theme-switcher-menu">
                    <div className="menu-section">
                        <h4 className="menu-title"><Terminal size={14} /> Themes</h4>
                        <div className="theme-grid">
                            {themes.map((t) => (
                                <button
                                    key={t.id}
                                    className={`theme-option ${theme === t.id ? 'active' : ''}`}
                                    onClick={() => setTheme(t.id)}
                                >
                                    <span className="color-dot" style={{ backgroundColor: t.color }}></span>
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="menu-divider"></div>

                    <div className="menu-section">
                        <h4 className="menu-title"><Monitor size={14} /> Effects</h4>
                        <div className="effects-list">
                            <label className="effect-toggle">
                                <input
                                    type="checkbox"
                                    checked={crtEnabled}
                                    onChange={(e) => setCrtEnabled(e.target.checked)}
                                />
                                <span className="toggle-label">CRT Scanlines</span>
                            </label>

                            <label className="effect-toggle">
                                <input
                                    type="checkbox"
                                    checked={matrixEnabled}
                                    onChange={(e) => setMatrixEnabled(e.target.checked)}
                                />
                                <span className="toggle-label">Matrix Rain</span>
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
