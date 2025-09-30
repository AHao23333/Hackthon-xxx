import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Eye, ArrowRight, Zap } from "lucide-react";

interface Block {
  id: number;
  type: string;
  category: string;
  label: string;
  config: any;
  x: number;
  y: number;
}

interface RulePreviewProps {
  blocks: Block[];
}

export function RulePreview({ blocks }: RulePreviewProps) {
  const generatePlainLanguage = (blocks: Block[]) => {
    if (blocks.length === 0) {
      return "No rule defined yet. Add blocks to see a preview.";
    }

    const triggers = blocks.filter(
      (b) => b.category === "triggers",
    );
    const conditions = blocks.filter(
      (b) => b.category === "conditions",
    );
    const actions = blocks.filter(
      (b) => b.category === "actions",
    );

    let description = "";

    // Triggers
    if (triggers.length > 0) {
      description += "When ";
      description += triggers
        .map((trigger) => {
          let triggerText = trigger.label.toLowerCase();
          if (
            trigger.config &&
            trigger.config.emailType &&
            trigger.config.emailType !== "any"
          ) {
            triggerText = triggerText.replace(
              "email",
              `${trigger.config.emailType} email`,
            );
          }
          return triggerText;
        })
        .join(" or ");
    }

    // Conditions
    if (conditions.length > 0) {
      description += ", and if ";
      description += conditions
        .map((condition) => {
          let conditionText = condition.label.toLowerCase();
          if (condition.config) {
            if (condition.config.amount) {
              conditionText = conditionText.replace(
                "greater than",
                `greater than $${condition.config.amount}`,
              );
            }
            if (condition.config.quantity) {
              conditionText = conditionText.replace(
                "below",
                `below ${condition.config.quantity}`,
              );
            }
            if (condition.config.priority) {
              conditionText = conditionText.replace(
                "is",
                `is ${condition.config.priority}`,
              );
            }
          }
          return conditionText;
        })
        .join(" and ");
    }

    // Actions
    if (actions.length > 0) {
      description += ", then ";
      description += actions
        .map((action) => {
          let actionText = action.label.toLowerCase();
          if (action.config) {
            if (
              action.config.recipient &&
              action.config.recipient !== "owner"
            ) {
              actionText = actionText.replace(
                "notification",
                `notification to ${action.config.recipient}`,
              );
            }
            if (
              action.config.template &&
              action.config.template !== "default"
            ) {
              actionText += ` using ${action.config.template} template`;
            }
          }
          return actionText;
        })
        .join(", ");
    }

    description += ".";

    // Capitalize first letter
    return (
      description.charAt(0).toUpperCase() + description.slice(1)
    );
  };

  const getRuleComplexity = (blocks: Block[]) => {
    const score = blocks.length;
    if (score === 0)
      return {
        level: "None",
        color: "bg-gray-100 text-gray-800",
      };
    if (score <= 2)
      return {
        level: "Simple",
        color: "bg-green-100 text-green-800",
      };
    if (score <= 4)
      return {
        level: "Medium",
        color: "bg-yellow-100 text-yellow-800",
      };
    return {
      level: "Complex",
      color: "bg-red-100 text-red-800",
    };
  };

  const getExecutionFlow = (blocks: Block[]) => {
    const triggers = blocks.filter(
      (b) => b.category === "triggers",
    );
    const conditions = blocks.filter(
      (b) => b.category === "conditions",
    );
    const actions = blocks.filter(
      (b) => b.category === "actions",
    );

    const flow = [];

    if (triggers.length > 0) {
      flow.push({
        step: "Trigger",
        items: triggers.map((t) => t.label),
        color: "bg-blue-100 text-blue-800",
      });
    }

    if (conditions.length > 0) {
      flow.push({
        step: "Check Conditions",
        items: conditions.map((c) => c.label),
        color: "bg-yellow-100 text-yellow-800",
      });
    }

    if (actions.length > 0) {
      flow.push({
        step: "Execute Actions",
        items: actions.map((a) => a.label),
        color: "bg-green-100 text-green-800",
      });
    }

    return flow;
  };

  const complexity = getRuleComplexity(blocks);
  const executionFlow = getExecutionFlow(blocks);
  const plainLanguage = generatePlainLanguage(blocks);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Eye className="h-5 w-5" />
          <span>Rule Preview</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Rule Summary */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Rule Summary
            </span>
            <Badge
              className={complexity.color}
              variant="secondary"
            >
              {complexity.level}
            </Badge>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg text-sm">
            {plainLanguage}
          </div>
        </div>

        {/* Execution Flow */}
        {executionFlow.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">
              Execution Flow
            </h4>
            <ScrollArea className="h-32">
              <div className="space-y-2">
                {executionFlow.map((step, index) => (
                  <div key={index}>
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge
                        className={step.color}
                        variant="secondary"
                        className="text-xs"
                      >
                        {step.step}
                      </Badge>
                      {index < executionFlow.length - 1 && (
                        <ArrowRight className="h-3 w-3 text-gray-400" />
                      )}
                    </div>
                    <div className="ml-2 text-xs text-gray-600">
                      {step.items.map((item, itemIndex) => (
                        <div key={itemIndex}>• {item}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Rule Statistics */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 bg-blue-50 rounded">
            <div className="text-lg font-medium text-blue-600">
              {
                blocks.filter((b) => b.category === "triggers")
                  .length
              }
            </div>
            <div className="text-xs text-blue-600">
              Triggers
            </div>
          </div>
          <div className="p-2 bg-yellow-50 rounded">
            <div className="text-lg font-medium text-yellow-600">
              {
                blocks.filter(
                  (b) => b.category === "conditions",
                ).length
              }
            </div>
            <div className="text-xs text-yellow-600">
              Conditions
            </div>
          </div>
          <div className="p-2 bg-green-50 rounded">
            <div className="text-lg font-medium text-green-600">
              {
                blocks.filter((b) => b.category === "actions")
                  .length
              }
            </div>
            <div className="text-xs text-green-600">
              Actions
            </div>
          </div>
        </div>

        {/* Performance Estimate */}
        {blocks.length > 0 && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 text-sm">
              <Zap className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-800">
                Performance Estimate
              </span>
            </div>
            <div className="text-xs text-blue-600 mt-1">
              Expected execution time: &lt;2 seconds • Resource
              usage: {complexity.level.toLowerCase()}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}