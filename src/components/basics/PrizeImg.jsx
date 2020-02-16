import React from "react"
import PropTypes from "prop-types"
import ApplicationSetting from "../../libs/common/applicationSetting"
const PrizeImg = (props) => {
  const setting = ApplicationSetting.getServerSetting()
  const src = `${setting.url}/${setting.base}/${setting.prizeImg}/${props.prizeName}${setting.ext}`
  const size = props.size || "100px"
  const alt = props.alt || "No Image"
  const isSelected = props.isSelected === true
  const imgStyle = isSelected ? {"border": "4px solid #2ca1d2", "borderRadius": "50px" } : {"border": "1px solid gray" , "borderRadius": "50px"} 
  return (
    <img 
      src={src}
      width={size}
      height={size}
      borderstyle={"solid"}
      style={imgStyle}
      align={"center"}
      alt={alt}
      onClick={props.onClick}
    />
  )
}

PrizeImg.propTypes = {
  prizeName: PropTypes.string.isRequired,
  size: PropTypes.string,
  alt: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
}

export default PrizeImg
