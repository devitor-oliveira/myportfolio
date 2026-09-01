import { useReducer } from "react";
import { commandRegistry } from "@/lib/commands";

export type CommandLog = {
  id: number;
  status: "pending" | "success" | "failed";
  command: string;
  output?: string;
};

type Action =
  | {
      type: "ADD_PENDING";
      payload: { id: number; command: string };
    }
  | {
      type: "RESOLVE_SUCCESS";
      payload: { id: number; output: string };
    }
  | {
      type: "RESOLVE_ERROR";
      payload: { id: number; error: string };
    };

function terminalReducer(state: CommandLog[], action: Action): CommandLog[] {
  switch (action.type) {
    case "ADD_PENDING":
      return [
        ...state,
        {
          id: action.payload.id,
          command: action.payload.command,
          status: "pending",
        },
      ];
    case "RESOLVE_SUCCESS":
      return state.map((log) =>
        log.id === action.payload.id
          ? {
              ...log,
              status: "success",
              output: action.payload.output,
            }
          : log,
      );
    case "RESOLVE_ERROR":
      return state.map((log) =>
        log.id === action.payload.id
          ? {
              ...log,
              status: "failed",
              output: action.payload.error,
            }
          : log,
      );
    default:
      return state;
  }
}

function parseCommand(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("cd ")) {
    return trimmed.slice(3).trim() || null;
  }

  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  return null;
}

export function useTerminalCommand() {
  const [logs, dispatch] = useReducer(terminalReducer, []);

  const executeCommand = async (rawInput: string) => {
    const cmd = parseCommand(rawInput);
    if (!cmd) return;

    const id = logs.length + 1;
    dispatch({
      type: "ADD_PENDING",
      payload: { id, command: cmd },
    });

    const entry = commandRegistry[cmd];
    if (!entry) {
      dispatch({
        type: "RESOLVE_ERROR",
        payload: {
          id,
          error: `Comando não encontrado: ${cmd}`,
        },
      });
      return;
    }

    try {
      const output = await entry.handler();
      dispatch({
        type: "RESOLVE_SUCCESS",
        payload: { id, output },
      });
    } catch (err) {
      dispatch({
        type: "RESOLVE_ERROR",
        payload: { id, error: `${err}` },
      });
    }
  };

  return { logs, executeCommand };
}
