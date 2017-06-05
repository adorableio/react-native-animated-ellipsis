import React, { Component }    from 'react';
import { Text, Animated }      from 'react-native';
import PropTypes               from 'prop-types';


export default class AnimatedEllipsis extends Component {
  static propTypes = {
    numberOfDots: PropTypes.number,
    animationDelay: PropTypes.number,
    style: PropTypes.object,
  };

  static defaultProps = {
    numberOfDots: 3,
    animationDelay: 300,
    style: {
      color: '#aaa',
      fontSize: 32,
    }
  };

  constructor(props) {
    super(props);

    this._animation_state = {
      dot_opacities: this.initializeDots(),
      fade_direction: 1,
      should_animate: true,
    };
  }

  initializeDots() {
    let opacities = [];

    for (let i = 0; i < this.props.numberOfDots; i++) {
      let dot = new Animated.Value(0);
      opacities.push(dot);
    }

    return opacities;
  }

  componentDidMount() {
    this.animate_dots.bind(this)(0);
  }

  componentWillUnmount() {
    this._animation_state.should_animate = false;
  }

  animate_dots(which_dot) {
    if (!this._animation_state.should_animate) return;

    // swap fade direction when we hit end of list
    if (which_dot >= this._animation_state.dot_opacities.length) {
      which_dot = 0;
      this._animation_state.fade_direction = this._animation_state.fade_direction == 0 ? 1 : 0;
    }

    let next_dot = which_dot + 1;

    Animated.timing(this._animation_state.dot_opacities[which_dot], {
      toValue: this._animation_state.fade_direction,
      duration: this.props.animationDelay,
    }).start(this.animate_dots.bind(this, next_dot));
  }

  render () {
    let dots = this._animation_state.dot_opacities.map((o, i) =>
      <Animated.Text key={i} style={{ opacity: o }}> .</Animated.Text>
    );

    return (
      <Text style={this.props.style}>
        {dots}
      </Text>
    );
  }
}

