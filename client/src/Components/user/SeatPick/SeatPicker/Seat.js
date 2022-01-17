import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";

export default class Seat extends Component {
  static defaultProps = {
    isSelected: false,
  };

  handleClick = () => {
    !this.props.isReserved && this.props.selectSeat();
  };

  render() {
    const {
      isSelected,
      tooltip,
      isEnabled,
      isReserved,
      orientation,
      Cabin,
      isWrongCabin,
    } = this.props;
    var CabinClass=""
    if(Cabin.localeCompare("business")==0){
      CabinClass = "seat--business"
    }
    else if(Cabin.localeCompare("first")==0){
      CabinClass = "seat--firstclass"
    }
    else{
      CabinClass = "seat--economy"
    }
   
    const className =
      "seat " + 
      (isWrongCabin? "seat--notYourCabin " : "") +
      CabinClass + 
      (isSelected ? " seat--selected" : "") +
      (!isSelected && isEnabled && !isReserved ? " seat--enabled" : "") +
      (isReserved ? " seat--reserved" : "") +
      
      ` seat--${!orientation ? "north" : orientation}`;
      console.log(className);
      var onclick = (isWrongCabin)? null : this.handleClick;
    return (
      <div data-tip={tooltip} className={className} onClick={onclick}>
        {tooltip ? <ReactTooltip {...this.props.tooltipProps} /> : null}
        <span className="seat__number">{this.props.seatNumber}</span>
      </div>
    );
  }
}

Seat.propTypes = {
  isSelected: PropTypes.bool,
  isReserved: PropTypes.bool,
  tooltip: PropTypes.string,
  isEnabled: PropTypes.bool,
  orientation: PropTypes.oneOf(["north", "south", "east", "west"]),
  seatNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectSeat: PropTypes.func.isRequired,
  tooltipProps: PropTypes.object,
};
