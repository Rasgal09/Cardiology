import * as React from "react";
import Svg, {
    Defs,
    Ellipse,
    G,
    LinearGradient,
    Path,
    Stop,
} from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
} & React.ComponentProps<typeof Svg>;

const Logo: React.FC<Props> = ({ width = 200, height = 200 , ...rest }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 581 537"
    fill="none"
    {...rest}
  >
    <G>
      <Path
        stroke="url(#b)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={22}
        d="M256 27v50M106 27v50m0-25H81a50 50 0 0 0-50 50v100a150 150 0 0 0 150 150m0 0a150.002 150.002 0 0 0 150-150V102a50 50 0 0 0-50-50h-25m-75 300a150.002 150.002 0 0 0 150 150 150.002 150.002 0 0 0 150-150"
      />
    </G>
    <Ellipse cx={411.645} cy={215.625} fill="url(#c)" rx={9.677} ry={9.625} />
    <Ellipse cx={434.226} cy={215.625} fill="url(#d)" rx={9.677} ry={9.625} />
    <Ellipse cx={390.677} cy={238.083} fill="url(#e)" rx={9.677} ry={9.625} />
    <Ellipse cx={413.258} cy={238.083} fill="url(#f)" rx={9.677} ry={9.625} />
    <Ellipse cx={435.839} cy={238.083} fill="url(#g)" rx={9.677} ry={9.625} />
    <Ellipse cx={458.419} cy={238.083} fill="url(#h)" rx={9.677} ry={9.625} />
    <Ellipse cx={524.549} cy={215.625} fill="url(#i)" rx={9.677} ry={9.625} />
    <Ellipse cx={547.129} cy={215.625} fill="url(#j)" rx={9.677} ry={9.625} />
    <Ellipse cx={503.581} cy={238.083} fill="url(#k)" rx={9.677} ry={9.625} />
    <Ellipse cx={526.161} cy={238.083} fill="url(#l)" rx={9.677} ry={9.625} />
    <Ellipse cx={548.742} cy={238.083} fill="url(#m)" rx={9.677} ry={9.625} />
    <Ellipse cx={571.322} cy={238.083} fill="url(#n)" rx={9.677} ry={9.625} />
    <Ellipse cx={390.677} cy={260.542} fill="url(#o)" rx={9.677} ry={9.625} />
    <Ellipse cx={413.258} cy={260.542} fill="url(#p)" rx={9.677} ry={9.625} />
    <Ellipse cx={435.839} cy={260.542} fill="url(#q)" rx={9.677} ry={9.625} />
    <Ellipse cx={458.419} cy={260.542} fill="url(#r)" rx={9.677} ry={9.625} />
    <Ellipse cx={503.581} cy={260.542} fill="url(#s)" rx={9.677} ry={9.625} />
    <Ellipse cx={526.161} cy={260.542} fill="url(#t)" rx={9.677} ry={9.625} />
    <Ellipse cx={548.742} cy={260.542} fill="url(#u)" rx={9.677} ry={9.625} />
    <Ellipse cx={571.322} cy={260.542} fill="url(#v)" rx={9.677} ry={9.625} />
    <Ellipse cx={481} cy={260.542} fill="url(#w)" rx={9.677} ry={9.625} />
    <Ellipse cx={413.258} cy={283} fill="url(#x)" rx={9.677} ry={9.625} />
    <Ellipse cx={435.839} cy={283} fill="url(#y)" rx={9.677} ry={9.625} />
    <Ellipse cx={458.419} cy={283} fill="url(#z)" rx={9.677} ry={9.625} />
    <Ellipse cx={503.581} cy={283} fill="url(#A)" rx={9.677} ry={9.625} />
    <Ellipse cx={526.161} cy={283} fill="url(#B)" rx={9.677} ry={9.625} />
    <Ellipse cx={548.742} cy={283} fill="url(#C)" rx={9.677} ry={9.625} />
    <Ellipse cx={481} cy={283} fill="url(#D)" rx={9.677} ry={9.625} />
    <Ellipse cx={435.839} cy={305.458} fill="url(#E)" rx={9.677} ry={9.625} />
    <Ellipse cx={458.419} cy={305.458} fill="url(#F)" rx={9.677} ry={9.625} />
    <Ellipse cx={503.581} cy={305.458} fill="url(#G)" rx={9.677} ry={9.625} />
    <Ellipse cx={526.161} cy={305.458} fill="url(#H)" rx={9.677} ry={9.625} />
    <Ellipse cx={481} cy={305.458} fill="url(#I)" rx={9.677} ry={9.625} />
    <Ellipse cx={458.419} cy={327.917} fill="url(#J)" rx={9.677} ry={9.625} />
    <Ellipse cx={503.581} cy={327.917} fill="url(#K)" rx={9.677} ry={9.625} />
    <Ellipse cx={481} cy={327.917} fill="url(#L)" rx={9.677} ry={9.625} />
    <Defs>
      <LinearGradient id="b" x1={281} x2={281} y1={27} y2={502} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="c" x1={411.645} x2={411.645} y1={206} y2={225.25} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="d" x1={434.226} x2={434.226} y1={206} y2={225.25} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="e" x1={390.677} x2={390.677} y1={228.458} y2={247.708} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="f" x1={413.258} x2={413.258} y1={228.458} y2={247.708} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="g" x1={435.839} x2={435.839} y1={228.458} y2={247.708} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="h" x1={458.419} x2={458.419} y1={228.458} y2={247.708} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="i" x1={524.549} x2={524.549} y1={206} y2={225.25} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="j" x1={547.129} x2={547.129} y1={206} y2={225.25} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="k" x1={503.581} x2={503.581} y1={228.458} y2={247.708} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="l" x1={526.161} x2={526.161} y1={228.458} y2={247.708} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="m" x1={548.742} x2={548.742} y1={228.458} y2={247.708} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="n" x1={571.322} x2={571.322} y1={228.458} y2={247.708} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="o" x1={390.677} x2={390.677} y1={250.917} y2={270.167} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="p" x1={413.258} x2={413.258} y1={250.917} y2={270.167} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="q" x1={435.839} x2={435.839} y1={250.917} y2={270.167} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="r" x1={458.419} x2={458.419} y1={250.917} y2={270.167} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="s" x1={503.581} x2={503.581} y1={250.917} y2={270.167} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="t" x1={526.161} x2={526.161} y1={250.917} y2={270.167} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="u" x1={548.742} x2={548.742} y1={250.917} y2={270.167} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="v" x1={571.322} x2={571.322} y1={250.917} y2={270.167} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="w" x1={481} x2={481} y1={250.917} y2={270.167} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="x" x1={413.258} x2={413.258} y1={273.375} y2={292.625} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="y" x1={435.839} x2={435.839} y1={273.375} y2={292.625} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="z" x1={458.419} x2={458.419} y1={273.375} y2={292.625} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="A" x1={503.581} x2={503.581} y1={273.375} y2={292.625} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="B" x1={526.161} x2={526.161} y1={273.375} y2={292.625} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="C" x1={548.742} x2={548.742} y1={273.375} y2={292.625} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="D" x1={481} x2={481} y1={273.375} y2={292.625} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="E" x1={435.839} x2={435.839} y1={295.833} y2={315.083} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="F" x1={458.419} x2={458.419} y1={295.833} y2={315.083} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="G" x1={503.581} x2={503.581} y1={295.833} y2={315.083} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="H" x1={526.161} x2={526.161} y1={295.833} y2={315.083} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="I" x1={481} x2={481} y1={295.833} y2={315.083} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="J" x1={458.419} x2={458.419} y1={318.292} y2={337.542} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="K" x1={503.581} x2={503.581} y1={318.292} y2={337.542} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
      <LinearGradient id="L" x1={481} x2={481} y1={318.292} y2={337.542} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#8E271F" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default Logo;
