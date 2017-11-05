import React, { Component } from 'react';
import Image from './image';
import blueSeal from '../images/seals/Nyc-seal-blue.png';
import greySeal from '../images/seals/Seal_of_New_York_City_BW.png';

export default class InspectionSeal extends Component {
    render() {
        var attributes = {
			alt: 'NYC Seal',
			className: null,
			src: (this.props.seal === "blue") ? blueSeal : greySeal,
			style: null
        };
        
        return (
            <div className="inspection-seal">
                <Image attr={attributes} />
            </div>
        );
    }
}