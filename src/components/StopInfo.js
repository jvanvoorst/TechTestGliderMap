import React from 'react';

export default function StopInfo({ stop, stopInfo, status }) {
    return (
        <>
            <p>{stop.name}</p>
            <p>Departures:</p>
            {status === 'loading' ? (
                <p>Loading...</p>
            ) : (
                (stopInfo.departures || [])
                    .slice(0, 5)
                    .map((d, i) => (
                        <p key={i}>{`${d.to} in ${d.min_until} min.`}</p>
                    ))
            )}
        </>
    );
}
