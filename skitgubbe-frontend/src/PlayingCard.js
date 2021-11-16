import React from "react";
import playingcardsdeck from "./playing_cards_deck.svg";

export class PlayingCard extends React.Component {
    constructor(props) {
        super(props);
        this.handleDown = this.handleDown.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
    }

    handleDown(event) {
        event.preventDefault(); // Let's stop this event.
        this.props.handleDown(this.props.type, this.props.id);
    }

    handleTouchStart(event) {
        event.preventDefault(); // Let's stop this event.
        event.stopPropagation();
        this.props.handleCardTouchStart(this.props.type, this.props.id);
    }

    render() {
        let css_style = this.calcPositionAndStyle(this.props.type, this.props.id, this.props.count, this.props.up, this.props.player);
        this.setImageSettings(this.props.color, this.props.value, css_style);

        if (!this.props.up) {
            css_style.backgroundColor = 'darkgray';
            css_style.backgroundImage = '';
        }




        const debug = false;

        if (debug) {
            return (
                <div style={css_style} onMouseDown={this.handleDown} onTouchStart={this.handleTouchStart}>
                    <p>id={this.props.id}</p>
                    <p>color={this.props.color}</p>
                    <p>value={this.props.value}</p>
                </div>
            );
        } else {
            return (
                <div style={css_style} onMouseDown={this.handleDown} onTouchStart={this.handleTouchStart}>
                </div>
            );

        }
    }

    setImageSettings(color, value, css_style) {
        let baseOffsetX = 5.5;
        let cardWidthX = 75;
        let valueForXCalc = value;
        if (valueForXCalc === 14) {
            valueForXCalc = 1;
        }
        let positionX = baseOffsetX + cardWidthX * (valueForXCalc-1);

        css_style.backgroundPositionX = `-${positionX}px`;
        css_style.backgroundSize = '1400%';
        switch (color) {
            case 'hearts':
                css_style.backgroundPositionY = `-5.5px`;
                break;
            case 'diamonds':
                css_style.backgroundPositionY = `-115px`;
                break;
            case 'spades':
                css_style.backgroundPositionY = `-224.5px`;
                break;
            case 'clubs':
                css_style.backgroundPositionY = `-334px`;
                break;
            default:
        }
    }

    calcPositionAndStyle(type, id, count, up, player) {
        let css_style = {
            position: 'absolute',
            top: 0 + 'px',
            left: 0 + 'px',
            zIndex: count - id,
            width: '70px',
            height: '103px',
            backgroundImage:`url(${playingcardsdeck})`,
            backgroundColor: 'transparent',
            'borderStyle': 'solid',
            'borderWidth': '1px',
            'borderColor': 'black',
            'textAlign': 'center',
            'userSelect': 'none',
            'fontSize': '7px'
        }

        let topOffset = 20;
        if (type === "DECK") {
            css_style.left = 200 - 0.1 * Number(id) + 'px';
            css_style.top = (topOffset + (200 - 0.3 * Number(id))) + 'px';
        }

        if (type === "TABLE") {
            css_style.left = 100 - 0.1 * Number(id) + 'px';
            css_style.top = (topOffset + (200 - 0.3 * Number(id))) + 'px';
        }

        if (type === "TABLETURNEDAWAY") {
            css_style.left = 300 - 0.1 * Number(id) + 'px';
            css_style.top = (topOffset + (200 - 0.3 * Number(id))) + 'px';
        }

        if (type === "PLAYER1HAND") {
            let left_offset = 300/count;
            css_style.left = left_offset/3 + left_offset * Number(id) + 'px';
            css_style.top = (topOffset + 60) + 'px';
            css_style.zIndex += 100;
            if (player === 2) {
                css_style.backgroundImage = "";
                css_style.backgroundColor = "lightpink";
            }
        }

        if (type === "PLAYER1TABLE") {
            let left_offset = 300/count;
            css_style.left = left_offset/3 + left_offset * Number(id) + 'px';
            css_style.top = (topOffset + 50) + 'px';

        }

        if (type === "PLAYER2HAND") {
            let left_offset = 300/count;
            css_style.left = left_offset/3 + left_offset * Number(id) + 'px';
            css_style.top = (topOffset + 320) + 'px';
            css_style.zIndex += 100;
            if (player === 1) {
                css_style.backgroundImage = "";
                css_style.backgroundColor = "lightpink";
            }
        }

        if (type === "PLAYER2TABLE") {
            let left_offset = 300 / count;
            css_style.left = left_offset / 3 + left_offset * Number(id) + 'px';
            css_style.top = (topOffset + 330) + 'px';
        }

        return css_style;
    }
}
