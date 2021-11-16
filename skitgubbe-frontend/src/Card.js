import React from "react";

export class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: props.color,
            position: 'absolute'
        };
        this.handleDown = this.handleDown.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
    }

    handleDown(event) {
        event.preventDefault(); // Let's stop this event.
        this.props.handleDown(this.props.id, event.clientX, event.clientY);
    }

    handleTouchStart(event) {
        event.preventDefault(); // Let's stop this event.
        event.stopPropagation();
        this.props.handleCardTouchStart(this.props.id, event.touches[0].clientX, event.touches[0].clientY);
    }

    render() {
        var newDivStyle = {
            backgroundColor: this.state.backgroundColor,
            position: 'absolute',
            top: this.props.y + 'px',
            left: this.props.x + 'px',
            zIndex: this.props.zindex
        }
        return (
            <div id="hearts-ace" style={newDivStyle} onMouseDown={this.handleDown} onTouchStart={this.handleTouchStart}>
                id={this.props.id}, z={this.props.zindex}
            </div>
        );
    }
}
