import React from 'react';
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow,
    circle,
} from 'react-google-maps';

import StopInfo from './StopInfo';

const BELFAST_DEFAULT_LOCATION = {
    lat: 54.607868,
    lng: -5.926437,
};

const GliderMap = withScriptjs(
    withGoogleMap(
        ({
            bus,
            stops,
            stopInfo,
            stopInfoStatus,
            handleOpenInfoWindow,
            toggleInfoWindowOpen,
        }) => {
            return (
                <GoogleMap
                    defaultZoom={13}
                    defaultCenter={BELFAST_DEFAULT_LOCATION}
                >
                    {bus && bus.stop && <circle center={{ lat: bus.stop.lat, lng: bus.stop.lng }} />}
                    {stops.map((s) => (
                        <Marker
                            key={s.id}
                            position={{ lat: s.lat, lng: s.lng }}
                            onClick={() => handleOpenInfoWindow(s.id)}
                        >
                            {s.infoWindow && (
                                <InfoWindow
                                    onCloseClick={() =>
                                        toggleInfoWindowOpen(s.id)
                                    }
                                >
                                    <StopInfo
                                        stop={s}
                                        stopInfo={stopInfo}
                                        status={stopInfoStatus}
                                    />
                                </InfoWindow>
                            )}
                        </Marker>
                    ))}
                </GoogleMap>
            );
        }
    )
);

export default GliderMap;
