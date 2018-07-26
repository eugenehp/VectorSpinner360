import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  asset,
  Image,
  Ring,
  View,
} from 'react-360';
import * as THREE from 'three';

export default class VectorSpinner360 extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {
      percentage: 0
    };
  }

  componentWillMount() {
    let self = this;
    this.interval = setInterval(()=>{
      let {percentage} = self.state;
      percentage++
      if(percentage > 100) percentage = 0;
      self.setState({ percentage })
    },100)
  }

  componentWillUnMount() {
    clearInterval(this.interval)
  }

  render() {
    const { percentage } = this.state;
    const LENGTH = Math.PI*2;
    const thetaLength = LENGTH / 100 * percentage;

    return (
      <View style={styles.panel}>
        <Ring
          innerRadius={90}
          outerRadius={100}
          thetaSegments={100}
          phiSegments={1}
          thetaStart={Math.PI * 3/2}
          thetaLength={thetaLength}
          materialParameters={{
            color: 0x0000f0,
            side: THREE.DoubleSide
          }}
          style={{
            transform: [{ rotateY: 180 }]
          }}
        />
        <Image 
          source={asset('triangle.png')}
          style={{
            width: 100,
            height: 100,
          }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

AppRegistry.registerComponent('VectorSpinner360', () => VectorSpinner360);
