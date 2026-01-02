import React, { useState } from 'react';
import { Class_Radar_Screen } from './src/jsc_mctrl_radar_screen';

/**
 * Example demonstrating the Class_Radar_Screen component
 * Shows multiple instances with different configurations and highlighting
 */

const RadarScreenExample = () => {
    const [logs, setLogs] = useState([]);
    const [activeDemo, setActiveDemo] = useState('basic');
    const [rotation, setRotation] = useState(0);
    const [rotationSteps, setRotationSteps] = useState(0);
    const [autoRotate, setAutoRotate] = useState(false);
    
    const addLog = (message) => {
        setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    };

    // Auto-rotation effect
    React.useEffect(() => {
        let interval = null;
        if (autoRotate) {
            interval = setInterval(() => {
                setRotation(prev => (prev + 1) % 360);
            }, 50);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [autoRotate]);

    // Example highlight configurations
    const basicHighlights = [
        [3, 2, '#ff0000'],  // section 3, depth 2, red
        [5, 4, '#00ff00']   // section 5, depth 4, green
    ];

    const advancedHighlights = [
        [1, 1, '#ff6b6b'],  // section 1, depth 1, light red
        [2, 3, '#4ecdc4'],  // section 2, depth 3, teal
        [4, 2, '#45b7d1'],  // section 4, depth 2, blue
        [6, 4, '#96ceb4'],  // section 6, depth 4, green
        [8, 3, '#feca57']   // section 8, depth 3, yellow
    ];

    const rotationHighlights = [
        [2, 2, '#e74c3c'],
        [4, 3, '#3498db'],
        [6, 4, '#2ecc71']
    ];

    const clearLogs = () => {
        setLogs([]);
    };

    const handleDemoChange = (demoType) => {
        setActiveDemo(demoType);
        addLog(`Switched to ${demoType} demo`);
    };

    const getRadarProps = () => {
        switch (activeDemo) {
            case 'basic':
                return {
                    sections: 8,
                    depth: 4,
                    rotation_steps: rotationSteps,
                    rotation: rotation * Math.PI / 180,
                    highlighted_points: basicHighlights,
                    draw_pointer: true
                };
            case 'advanced':
                return {
                    sections: 8,
                    depth: 4,
                    rotation_steps: rotationSteps,
                    rotation: rotation * Math.PI / 180,
                    highlighted_points: advancedHighlights,
                    draw_pointer: true
                };
            case 'rotation':
                return {
                    sections: 8,
                    depth: 4,
                    rotation_steps: rotationSteps,
                    rotation: rotation * Math.PI / 180,
                    highlighted_points: rotationHighlights,
                    draw_pointer: true
                };
            case 'minimal':
                return {
                    sections: 6,
                    depth: 3,
                    rotation_steps: rotationSteps,
                    rotation: rotation * Math.PI / 180,
                    highlighted_points: [[3, 2, '#ff0000']],
                    draw_pointer: false
                };
            default:
                return {
                    sections: 8,
                    depth: 4,
                    rotation_steps: rotationSteps,
                    rotation: rotation * Math.PI / 180,
                    highlighted_points: basicHighlights,
                    draw_pointer: true
                };
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <h2>Class_Radar_Screen Component Examples</h2>
                    <p className="text-muted">
                        Interactive radar screen component with customizable grid, highlighting, and rotation capabilities.
                    </p>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h5>Radar Visualization</h5>
                            <div className="btn-group btn-group-sm mt-2" role="group">
                                <button 
                                    className={`btn ${activeDemo === 'basic' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => handleDemoChange('basic')}
                                >
                                    Basic
                                </button>
                                <button 
                                    className={`btn ${activeDemo === 'advanced' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => handleDemoChange('advanced')}
                                >
                                    Advanced
                                </button>
                                <button 
                                    className={`btn ${activeDemo === 'rotation' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => handleDemoChange('rotation')}
                                >
                                    Rotation
                                </button>
                                <button 
                                    className={`btn ${activeDemo === 'minimal' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => handleDemoChange('minimal')}
                                >
                                    Minimal
                                </button>
                            </div>
                        </div>
                        <div className="card-body d-flex justify-content-center align-items-center" style={{ minHeight: '450px' }}>
                            <div style={{ backgroundColor: '#1a1a1a', padding: '2rem', borderRadius: '0.5rem' }}>
                                <Class_Radar_Screen {...getRadarProps()} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5>Configuration</h5>
                            <button 
                                className="btn btn-sm btn-outline-secondary"
                                onClick={clearLogs}
                            >
                                Clear Logs
                            </button>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <h6>Rotation Controls:</h6>
                                <div className="mb-2">
                                    <label className="form-label">
                                        Rotation Angle: <strong>{rotation}°</strong>
                                    </label>
                                    <input 
                                        type="range" 
                                        className="form-range" 
                                        min="0" 
                                        max="360" 
                                        value={rotation}
                                        onChange={(e) => {
                                            setRotation(parseInt(e.target.value));
                                            addLog(`Rotation changed to ${e.target.value}°`);
                                        }}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">
                                        Rotation Steps: <strong>{rotationSteps}</strong>
                                    </label>
                                    <input 
                                        type="range" 
                                        className="form-range" 
                                        min="0" 
                                        max="8" 
                                        value={rotationSteps}
                                        onChange={(e) => {
                                            setRotationSteps(parseInt(e.target.value));
                                            addLog(`Rotation steps changed to ${e.target.value}`);
                                        }}
                                    />
                                </div>
                                <div className="btn-group btn-group-sm" role="group">
                                    <button 
                                        className={`btn ${autoRotate ? 'btn-success' : 'btn-outline-success'}`}
                                        onClick={() => {
                                            setAutoRotate(!autoRotate);
                                            addLog(`Auto-rotation ${autoRotate ? 'stopped' : 'started'}`);
                                        }}
                                    >
                                        {autoRotate ? 'Stop Auto' : 'Auto Rotate'}
                                    </button>
                                    <button 
                                        className="btn btn-outline-secondary"
                                        onClick={() => {
                                            setRotation(0);
                                            setRotationSteps(0);
                                            setAutoRotate(false);
                                            addLog('Rotation reset to 0°');
                                        }}
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>

                            <div className="mb-3">
                                <h6>Current Settings:</h6>
                                <div className="small">
                                    <div><strong>Sections:</strong> {getRadarProps().sections}</div>
                                    <div><strong>Depth:</strong> {getRadarProps().depth}</div>
                                    <div><strong>Rotation Steps:</strong> {getRadarProps().rotation_steps}</div>
                                    <div><strong>Rotation:</strong> {getRadarProps().rotation.toFixed(3)} rad ({rotation}°)</div>
                                    <div><strong>Pointer:</strong> {getRadarProps().draw_pointer ? 'Enabled' : 'Disabled'}</div>
                                    <div><strong>Highlighted Points:</strong> {getRadarProps().highlighted_points.length}</div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <h6>Highlighted Points:</h6>
                                <div className="small">
                                    {getRadarProps().highlighted_points.map((point, index) => (
                                        <div key={index} className="mb-1">
                                            <span 
                                                className="d-inline-block me-2" 
                                                style={{ 
                                                    width: '12px', 
                                                    height: '12px', 
                                                    backgroundColor: point[2], 
                                                    borderRadius: '50%',
                                                    border: '1px solid #ccc'
                                                }}
                                            ></span>
                                            Section {point[0]}, Depth {point[1]}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mt-3">
                        <div className="card-header">
                            <h5>Event Logs</h5>
                        </div>
                        <div className="card-body">
                            <div style={{ 
                                height: '200px', 
                                overflowY: 'auto', 
                                border: '1px solid #dee2e6',
                                borderRadius: '0.25rem',
                                padding: '0.5rem',
                                fontFamily: 'monospace',
                                fontSize: '0.875rem'
                            }}>
                                {logs.length === 0 ? (
                                    <div className="text-muted">No events yet. Switch between demos to see events.</div>
                                ) : (
                                    logs.map((log, index) => (
                                        <div key={index} className="mb-1">
                                            {log}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Usage Examples</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <h6>Basic Implementation</h6>
                                    <pre style={{ 
                                        backgroundColor: '#f8f9fa', 
                                        padding: '1rem', 
                                        borderRadius: '0.25rem',
                                        overflowX: 'auto',
                                        fontSize: '0.875rem'
                                    }}>
{`import { Class_Radar_Screen } from './jsc_mctrl_radar_screen';

const MyComponent = () => {
    const highlights = [
        [3, 2, '#ff0000'],  // section 3, depth 2, red
        [5, 4, '#00ff00']   // section 5, depth 4, green
    ];

    return (
        <Class_Radar_Screen 
            sections={8}
            depth={4}
            rotation_steps={0}
            rotation={0}
            highlighted_points={highlights}
            draw_pointer={true}
        />
    );
};`}
                                    </pre>
                                </div>
                                <div className="col-md-6">
                                    <h6>Advanced Configuration</h6>
                                    <pre style={{ 
                                        backgroundColor: '#f8f9fa', 
                                        padding: '1rem', 
                                        borderRadius: '0.25rem',
                                        overflowX: 'auto',
                                        fontSize: '0.875rem'
                                    }}>
{`const AdvancedRadar = () => {
    const [highlights, setHighlights] = useState([]);
    
    const addHighlight = (section, depth, color) => {
        setHighlights(prev => [...prev, [section, depth, color]]);
    };

    return (
        <Class_Radar_Screen 
            sections={12}
            depth={6}
            rotation_steps={3}
            rotation={Math.PI / 12}
            highlighted_points={highlights}
            draw_pointer={true}
        />
    );
};`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Props Reference</h5>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped table-sm">
                                    <thead>
                                        <tr>
                                            <th>Prop</th>
                                            <th>Type</th>
                                            <th>Default</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><code>sections</code></td>
                                            <td>number</td>
                                            <td>8</td>
                                            <td>Number of radial sections (rays)</td>
                                        </tr>
                                        <tr>
                                            <td><code>depth</code></td>
                                            <td>number</td>
                                            <td>4</td>
                                            <td>Number of concentric circles</td>
                                        </tr>
                                        <tr>
                                            <td><code>rotation_steps</code></td>
                                            <td>number</td>
                                            <td>0</td>
                                            <td>Rotation steps between rays</td>
                                        </tr>
                                        <tr>
                                            <td><code>rotation</code></td>
                                            <td>number</td>
                                            <td>0</td>
                                            <td>Free rotation in radians</td>
                                        </tr>
                                        <tr>
                                            <td><code>highlighted_points</code></td>
                                            <td>array</td>
                                            <td>[]</td>
                                            <td>Array of [section, depth, color] points</td>
                                        </tr>
                                        <tr>
                                            <td><code>draw_pointer</code></td>
                                            <td>boolean</td>
                                            <td>false</td>
                                            <td>Draw north arrow pointer</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RadarScreenExample;
