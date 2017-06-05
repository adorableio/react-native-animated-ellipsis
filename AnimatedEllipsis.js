import React, { Component }      from 'react';
import { Text, Animated }        from 'react-native';


export default class AnimatedEllipsis extends Component {
  constructor(props) {
    super(props);

    this._should_animate = true;

    this._animation_state = {
      first_dot_opacity: new Animated.Value(0),
      second_dot_opacity: new Animated.Value(0),
      third_dot_opacity: new Animated.Value(0),
      fade_direction: 1,
    };
  }

  componentDidMount() {
    this.fade_those_dots.bind(this)('first_dot_opacity');
  }

  componentWillUnmount() {
    this._should_animate = false;
  }

  fade_those_dots(which_dot) {
    if (!this._should_animate) return;

    let dots = ['first_dot_opacity', 'second_dot_opacity', 'third_dot_opacity'];

    if (typeof which_dot === 'undefined') {
      which_dot = dots[0];
      this._animation_state.fade_direction = this._animation_state.fade_direction == 0 ? 1 : 0;
    }

    let dot_index = dots.indexOf(which_dot);
    let next_dot_index = dot_index + 1;
    let next_dot = dots[next_dot_index];

    Animated.timing(this._animation_state[which_dot], {
      toValue: this._animation_state.fade_direction,
      duration: 200,
    }).start(this.fade_those_dots.bind(this, next_dot));
  }

  render () {
    return (
      <Text style={this.props.style}>
        <Animated.Text style={{
          opacity: this._animation_state.first_dot_opacity
        }}> .</Animated.Text>
        <Animated.Text style={{
          opacity: this._animation_state.second_dot_opacity
        }}> .</Animated.Text>
        <Animated.Text style={{
          opacity: this._animation_state.third_dot_opacity
        }}> .</Animated.Text>
      </Text>
    );
  }
}
