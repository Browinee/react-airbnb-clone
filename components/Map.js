import React, {useEffect, useState} from 'react';
import Image from "next/image";
import ReactMapGL, {Marker} from 'react-map-gl';
import {getCenter} from 'geolib';

function Map(props) {
    const {searchResults} = props;
    const coords = searchResults.map((result) => ({
        latitude: result.lat,
        longitude: result.long,
    }));
    const center = getCenter(coords);

    const [viewport, setViewport] = useState({
        latitude:0,
        longitude:0,
        // latitude: center.latitude,
        // longitude: center.longitude,
        zoom: 14,
        bearing: 0,
        pitch: 0,
    });
    const getCenterMap = (searchResults = []) => {
        const coords = searchResults.map((result) => ({
            latitude: result.lat,
            longitude: result.long,
        }));
        return getCenter(coords) || {latitude: 0, longitude: 0};
    };

    useEffect(() => {
        const center = getCenterMap(searchResults);
        setViewport(prev => {
            return {
                ...prev,
                latitude: center.latitude,
                longitude: center.longitude,
            }
        })
    }, [searchResults]);
    return (
        <ReactMapGL
            {...viewport}
            width="100%"
            height="100%"
            onViewportChange={setViewport}
            mapStyle={process.env.NEXT_PUBLIC_MAP_URL}
            mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
        >
            {
                searchResults.map(result => {
                    return (<div key={result.lat + result.long}
                    >
                        <Marker
                            latitude={result.lat}
                            longitude={result.long}
                            offsetLeft={-20}
                            offsetTop={-10}
                        >
                            <div className={"relative"}>
                                <button className={"px-3 py-1 font-bold duration-300 bg-white rounded-full shadow-md cursor-pointer focus:scale-90 peer"}>
                                    {result.price.split('/')[0]}
                                </button>
                                <div className={"absolute hidden w-48 p-3 text-left bg-white border border-gray-200 rounded-lg cursor-pointer bottom-9 peer-focus:block"}>
                                    <div className={"relative w-full h-24 mb-2"}>
                                        <Image
                                            src={result.img}
                                            alt={result.title}
                                            layout={"fill"}
                                            objectFit={"cover"}
                                            className={"rounded-lg"}
                                            placeholder={"blur"}
                                            blurDataURL={result.img}
                                        />
                                    </div>
                                    <div>
                                        <h2 className={"text-sm font-semibold"}>{result.title}</h2>
                                    </div>
                                </div>
                            </div>
                        </Marker>
                    </div>)
                })
            }
        </ReactMapGL>
    );
}

export default Map;
