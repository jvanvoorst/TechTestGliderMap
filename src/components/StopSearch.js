import React, { useState, useEffect } from 'react';

export default function StopSearch({ stops, handleOpenInfoWindow }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStops, setFilteredStops] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            setFilteredStops(
                stops.filter((s) =>
                    s.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, stops]);

    return (
        <div style={{ display: 'flex', margin: 20, overflow: 'scroll' }}>
            <input
                style={{ height: 15 }}
                name={searchTerm}
                placeholder={'Search Stops'}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredStops.map((s) => (
                <div
                    key={s.id}
                    style={{ margin: 5, color: 'blue' }}
                    onClick={() => handleOpenInfoWindow(s.id)}
                >
                    {s.name}
                </div>
            ))}
        </div>
    );
}
