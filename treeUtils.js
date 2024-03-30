export const DEFAULT_CONFIG = {
  radius: 20,
  nodeWidthSpacing: 35,
  nodeHeightSpacing: 75,
  fontSize: 10,
};

export function getRequiredHeightAndWidth(root) {
  const heightOfTree = root.getHeight();
  const maxLeafNodes = Math.pow(2, heightOfTree);
  const requiredCanvasHeight = heightOfTree * DEFAULT_CONFIG.nodeHeightSpacing;
  const requiredCanvasWidth = maxLeafNodes * DEFAULT_CONFIG.nodeWidthSpacing;

  return {
    requiredCanvasHeight,
    requiredCanvasWidth,
  };
}

export function drawNode(value, canvasElement, x, y) {
  const context = canvasElement.getContext("2d");

  // Draw circle

  context.beginPath();
  context.arc(x, y, DEFAULT_CONFIG.radius, 0, 2 * Math.PI, false);
  context.fillStyle = "lightsalmon";
  context.fill();

  // draw border
  context.beginPath();
  context.arc(x, y, DEFAULT_CONFIG.radius, 0, 2 * Math.PI, false);
  context.strokeStyle = "brown";
  context.stroke();

  // write value
  context.font = `${DEFAULT_CONFIG.fontSize}pt serif`;
  context.fillStyle = "red";
  context.textAlign = "center";
  context.fillText(value, x, y + DEFAULT_CONFIG.fontSize / 2);
}

export function connectEdges(canvasElement, xCoordinates, yCoordinates) {
  const { xStart, xEnd } = xCoordinates;
  const { yStart, yEnd } = yCoordinates;

  const start = {
    x: xStart,
    y: yStart,
  };

  const end = {
    x: xEnd,
    y: yEnd,
  };

  const xHalf = (xStart + xEnd) / 2;
  const yHalf = (yStart + yEnd) / 2;

  const cPoint1 = { x: xHalf, y: yHalf };
  const cPoint2 = { x: xEnd, y: yHalf };

  const context = canvasElement.getContext("2d");
  context.beginPath();
  context.strokeStyle = "brown";
  context.moveTo(start.x, start.y);
  context.bezierCurveTo(
    cPoint1.x,
    cPoint1.y,
    cPoint2.x,
    cPoint1.y,
    end.x,
    end.y
  );
  context.stroke();
}
