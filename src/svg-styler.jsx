
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  font-family: sans-serif;
  max-width: 600px;
  margin: 2rem auto;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const DurationBlock = styled.div`
  margin-bottom: 1rem;
`;

const AddKeyframeBlock = styled.div`
  margin-bottom: 2rem;
`;

const KeyframeBlock = styled.div`
  border: 1px solid #ccc;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  position: relative;
`;

const RemoveButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
`;

const KeyframeLabel = styled.label`
  margin-right: 0.5rem;
`;

const KeyframeInput = styled.input`
  margin-right: 1rem;
  width: 60px;
`;

const PreviewBlock = styled.div`
  margin: 2rem 0;
  text-align: center;
`;

const defaultKeyframes = [
  { percent: 0, rotate: 0, scale: 1, skew: 0, translateX: 0, translateY: 0 },
  { percent: 100, rotate: 0, scale: 1, skew: 0, translateX: 0, translateY: 0 }
];

function SVGStyler() {
  const [keyframes, setKeyframes] = useState(defaultKeyframes);
  const [duration, setDuration] = useState(2);
  const [svgPath, setSvgPath] = useState("M0,100 Q50,80 100,100 T200,100");

  // Helper to generate CSS keyframes from state
  const generateKeyframesCSS = () => {
    const frames = keyframes
      .map(
        k => `${k.percent}% { transform: translate(${k.translateX}px,${k.translateY}px) rotate(${k.rotate}deg) skewX(${k.skew}deg) scale(${k.scale}); }`
      )
      .join("\n");
    return `@keyframes svgAnim {\n${frames}\n}`;
  };

  // Add/remove keyframe
  const addKeyframe = () => {
    setKeyframes([...keyframes, { percent: 100, rotate: 0, scale: 1, skew: 0, translateX: 0, translateY: 0 }]);
  };
  const removeKeyframe = idx => {
    setKeyframes(keyframes.filter((_, i) => i !== idx));
  };

  // Update keyframe
  const updateKeyframe = (idx, field, value) => {
    const updated = keyframes.map((kf, i) =>
      i === idx ? { ...kf, [field]: value } : kf
    );
    setKeyframes(updated);
  };

  return (
    <Container>
      <Title>SVG Styler Widget</Title>
      <DurationBlock>
        <KeyframeLabel>Duration (seconds): </KeyframeLabel>
        <KeyframeInput
          type="number"
          min={0.5}
          step={0.1}
          value={duration}
          onChange={e => setDuration(Number(e.target.value))}
        />
      </DurationBlock>
      <DurationBlock>
        <KeyframeLabel>SVG Path: </KeyframeLabel>
        <KeyframeInput
          type="text"
          value={svgPath}
          onChange={e => setSvgPath(e.target.value)}
          style={{ width: "300px" }}
        />
      </DurationBlock>
      <AddKeyframeBlock>
        <button onClick={addKeyframe}>Add Keyframe</button>
      </AddKeyframeBlock>
      <div>
        {keyframes.map((kf, idx) => (
          <KeyframeBlock key={idx}>
            <strong>{kf.percent}%</strong>
            <RemoveButton onClick={() => removeKeyframe(idx)} disabled={keyframes.length <= 2}>Remove</RemoveButton>
            <div>
              <KeyframeLabel>Rotate: </KeyframeLabel>
              <KeyframeInput type="number" value={kf.rotate} onChange={e => updateKeyframe(idx, "rotate", Number(e.target.value))} />
              <KeyframeLabel>SkewX: </KeyframeLabel>
              <KeyframeInput type="number" value={kf.skew} onChange={e => updateKeyframe(idx, "skew", Number(e.target.value))} />
              <KeyframeLabel>Scale: </KeyframeLabel>
              <KeyframeInput type="number" step={0.01} value={kf.scale} onChange={e => updateKeyframe(idx, "scale", Number(e.target.value))} />
              <KeyframeLabel>TranslateX: </KeyframeLabel>
              <KeyframeInput type="number" value={kf.translateX} onChange={e => updateKeyframe(idx, "translateX", Number(e.target.value))} />
              <KeyframeLabel>TranslateY: </KeyframeLabel>
              <KeyframeInput type="number" value={kf.translateY} onChange={e => updateKeyframe(idx, "translateY", Number(e.target.value))} />
            </div>
          </KeyframeBlock>
        ))}
      </div>
      <PreviewBlock>
        <svg viewBox="0 0 200 200" width={200} height={200}>
          <style>{`
            .svg-path {
              animation: svgAnim ${duration}s ease-in-out infinite;
              transform-box: fill-box;
              transform-origin: center;
            }
            ${generateKeyframesCSS()}
          `}</style>
          <path
            className="svg-path"
            d={svgPath}
            fill="none"
            stroke="hsl(190 70% 55%)"
            strokeWidth="3"
          />
        </svg>
      </PreviewBlock>
    </Container>
  );
}

export default SVGStyler;
