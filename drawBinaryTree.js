import BinaryTreeNode from "./BinaryTreeNode.js";
import {
  drawNode,
  getRequiredHeightAndWidth,
  connectEdges,
  DEFAULT_CONFIG,
} from "./treeUtils.js";

const canvas = document.querySelector("#root");

function drawBinaryTree(root, canvasElement) {
  const maxWidth = window.innerWidth;
  const maxHeight = window.innerHeight;
  canvasElement.width = maxWidth;
  canvasElement.height = maxHeight;

  const { requiredCanvasHeight, requiredCanvasWidth } =
    getRequiredHeightAndWidth(root);

  const windowWidthCenter = maxWidth / 2;
  const requiredWidthCenter = requiredCanvasWidth / 2;
  const xStart = windowWidthCenter - requiredWidthCenter;
  const xEnd = windowWidthCenter + requiredWidthCenter;

  const horizontalConfig = {
    xStart,
    xEnd,
  };

  recursivelyDrawNodes(root, canvas, 0.5, horizontalConfig);
}

function recursivelyDrawNodes(root, canvas, currentLevel, horizontalConfig) {
  const { xStart, xEnd } = horizontalConfig;

  const xPos = (xStart + xEnd) / 2;
  const yPos = currentLevel * DEFAULT_CONFIG.nodeHeightSpacing;

  drawNode(root.value, canvas, xPos, yPos);

  if (root.left != null) {
    recursivelyDrawNodes(root.left, canvas, currentLevel + 1, {
      xStart,
      xEnd: xPos,
    });

    connectEdges(
      canvas,
      {
        xStart: xPos,
        xEnd: (xStart + xPos) / 2,
      },
      {
        yStart: yPos + DEFAULT_CONFIG.radius,
        yEnd:
          (currentLevel + 1) * DEFAULT_CONFIG.nodeHeightSpacing -
          DEFAULT_CONFIG.radius,
      }
    );
  }

  if (root.right != null) {
    recursivelyDrawNodes(root.right, canvas, currentLevel + 1, {
      xStart: xPos,
      xEnd,
    });
    connectEdges(
      canvas,
      {
        xStart: xPos,
        xEnd: (xEnd + xPos) / 2,
      },
      {
        yStart: yPos + DEFAULT_CONFIG.radius,
        yEnd:
          (currentLevel + 1) * DEFAULT_CONFIG.nodeHeightSpacing -
          DEFAULT_CONFIG.radius,
      }
    );
  }
}

const applyElement = document.querySelector("#apply");
const clearElement = document.querySelector("#clear");
const inputData = document.querySelector("#inputArea");

applyElement.addEventListener("click", function () {
  const elementArrayString = inputData?.value?.split(",");
  let index = 0;
  let root = null;
  let queue = [root];

  while (index < elementArrayString?.length) {
    if (
      elementArrayString[index] == "" ||
      elementArrayString[index] == "null"
    ) {
      if (root) {
        queue = queue.slice(1);
      }
      index += 1;
    } else {
      const element = elementArrayString[index];
      const node = queue[0];
      queue = queue.slice(1);
      if (node == null) {
        root = new BinaryTreeNode(element);
        index += 1;
        queue.push(root);
      } else {
        const left =
          elementArrayString[index] != "null"
            ? elementArrayString[index]
            : null;
        const right =
          index + 1 < elementArrayString?.length
            ? elementArrayString[index + 1] != "null"
              ? elementArrayString[index + 1]
              : null
            : null;

        index = index + 2;

        if (left != null) {
          node.left = new BinaryTreeNode(left);
          queue.push(node.left);
        }
        if (right != null) {
          node.right = new BinaryTreeNode(right);
          queue.push(node.right);
        }
      }
    }
  }
  drawBinaryTree(root, canvas);
});

clearElement.addEventListener("click", function () {
  inputData.value = "";
  drawBinaryTree(null, canvas);
});
