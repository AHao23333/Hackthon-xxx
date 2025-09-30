import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { DragDropCanvas } from "./DragDropCanvas";
import { BlockPalette } from "./BlockPalette";
import { RulePreview } from "./RulePreview";
import { SavedRules } from "./SavedRules";
import { Play, Save, Copy, Trash2 } from "lucide-react";
import { Alert } from "./alert";

export function RulesBuilder() {
  const [blocks, setBlocks] = useState([]);
  const [selectedRule, setSelectedRule] = useState(null);
  // const [showAlert, setShowAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  const handleAddBlock = (blockType: any) => {
    const newBlock = {
      id: Date.now(),
      type: blockType.type,
      category: blockType.category,
      label: blockType.label,
      config: blockType.defaultConfig || {},
      x: Math.random() * 400,
      y: Math.random() * 300,
    };
    setBlocks([...blocks, newBlock]);
  };

  const handleRemoveBlock = (blockId: number) => {
    setBlocks(blocks.filter((block) => block.id !== blockId));
  };

  const handleUpdateBlock = (blockId: number, updates: any) => {
    setBlocks(
      blocks.map((block) =>
        block.id === blockId ? { ...block, ...updates } : block
      )
    );
  };

  const handleSaveRule = () => {
    console.log("Saving rule with blocks:", blocks);
    alert("Rules and actions have been sent to Agent 🎉");
  };

  const handleTestRule = () => {
    // Test rule logic
    console.log("Testing rule with blocks:", blocks);
  };

  const handleClearCanvas = () => {
    setBlocks([]);
  };

  return (
      <div className="flex gap-6 h-[calc(100vh-200px)]">
        {/* Block Palette */}
        <div className="w-80">
          <BlockPalette onAddBlock={handleAddBlock} />
        </div>

        {/* Main Canvas */}
        <div className="flex-1">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Agent Builder Canvas</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleTestRule}
                    disabled={blocks.length === 0}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Test
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSaveRule}
                    disabled={blocks.length === 0}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearCanvas}
                    disabled={blocks.length === 0}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-80px)]">
              <DragDropCanvas
                blocks={blocks}
                onUpdateBlock={handleUpdateBlock}
                onRemoveBlock={handleRemoveBlock}
              />
            </CardContent>
          </Card>
        </div>

        {/* Preview & Saved Rules */}
        <div className="w-80 space-y-4">
          <RulePreview blocks={blocks} />
          <SavedRules onSelectRule={setSelectedRule} />
        </div>
      </div>
  );
}
