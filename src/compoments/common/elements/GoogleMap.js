import React, { useEffect, useState, useRef } from 'react';

import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { API_KEY_MAP, InitialPosition } from '../../../constants';
import { Spin } from "antd";

const mapStyles = {
    width: '100%',
    height: '100%'
  };

const GoogleMap = (props) => {
    const refMap = useRef();
    const [ state, setState ] = useState({
        pointsList: {},
    });
    useEffect(() => {
        const { points, isSearched } = props;
        const tmp = {};
        points && points.forEach(point => {
            if(tmp[point.agencyId]){
                tmp[point.agencyId].push({...point});
            }
            else{
                tmp[point.agencyId] = [];
                tmp[point.agencyId].push({...point});
            }
        })

        if(points.length >= 1){
            refMap.current && refMap.current.map.setCenter({
                lat: points[0].latitude,
                lng: points[0].longitude,
            })
        }
        else if(!isSearched){
            refMap.current && refMap.current.map.setCenter({
                ...InitialPosition
            })
        }

        setState({
            pointsList: tmp,
        });
    }, [JSON.stringify(props.points)]);

    const onMarkerClick = (markerProps, marker, e) => {
        props.handleMarkerClick(markerProps);
    }
    const renderMarker = () => {
        const markers = Object.keys(state.pointsList) && Object.keys(state.pointsList).map(agencyId=>(
            <Marker
                key={agencyId}
                position={{
                    lat: state.pointsList[agencyId][0].latitude,
                    lng: state.pointsList[agencyId][0].longitude,
                }}
                onClick={onMarkerClick}
                name={state.pointsList[agencyId][0].agencyName}
                pointData={state.pointsList[agencyId]}
                />
            ))    
        return markers; 
    }
    return (
        <Spin tip="Loading..." spinning={props.loading}>
            <div style={{position: "relative",  minHeight: "calc(99vh - 258px)", marginTop: "1vh"}}>
                <Map
                ref={refMap}
                google={props.google}
                zoom={14}
                style={mapStyles}
                initialCenter = {{...InitialPosition}}
                >
                    {renderMarker()}
                </Map>
            </div>
        </Spin>
    );
}

export default GoogleApiWrapper({
    apiKey: API_KEY_MAP
  })(GoogleMap);