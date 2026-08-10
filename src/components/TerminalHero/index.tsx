import { useState } from "react";

import { RippleButton } from "../ui/ripple-button";
import { AnimatedSpan, Terminal, TypingAnimation } from "../ui/terminal";
import { Icon } from "@iconify/react";
import {
  useTerminalCommand,
  type CommandLog,
} from "@/hooks/useTerminalCommand";
import TextType from "../ui/text-type";
import { commands } from "@/lib/utils";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Spinner } from "../ui/spinner";

interface TerminalHeroProps {
  lastPostID: string;
}

function TerminalHero({ lastPostID }: TerminalHeroProps) {
  const [inputCMD, setInputCMD] = useState("");
  const { logs, executeCommand } = useTerminalCommand();

  const handleSubmit = (ev: React.SubmitEvent) => {
    ev.preventDefault();
    executeCommand(inputCMD, lastPostID);
    setInputCMD("");
    return;
  };

  return (
    <Terminal
      sequence={false}
      className="flex flex-col h-full w-full max-w-none max-h-none border-none bg-bg-main shadow-xl"
    >
      <div className="flex flex-col min-h-0 flex-1 bg-none">
        <div className="flex flex-col overflow-y-auto min-h-0 flex-1 pr-2 font-detail text-caption">
          <p className="animate-fade-up text-text-main/70">
            Terminal iniciando...
          </p>
          <TypingAnimation
            startOnView={false}
            delay={1000}
            duration={30}
            className="text-success"
          >
            {"[OK] Componentes carregados..."}
          </TypingAnimation>
          <TypingAnimation
            startOnView={false}
            delay={2000}
            duration={30}
            className="text-warning"
          >
            {"[WARN] Aguardando comandos..."}
          </TypingAnimation>
          {/* <TypingAnimation
						startOnView={false}
						delay={2000}
						duration={30}
						className="text-text-main/90"
					>
						{'$'}
					</TypingAnimation> */}
          {logs.map((log: CommandLog) => {
            return (
              <>
                <TypingAnimation
                  className="text-text-main/90 mt-5"
                  key={log.id}
                >
                  {`$ ${log.command}`}
                </TypingAnimation>
                {log.status === "pending" && (
                  <TextType
                    className="text-text-main/80"
                    words={["Executando..."]}
                    variant="one-word"
                  />
                )}
                {log.status === "success" && (
                  <AnimatedSpan className="text-success">
                    {log.output}
                  </AnimatedSpan>
                )}
                {log.status === "failed" && (
                  <AnimatedSpan className="text-danger">
                    {log.output}
                  </AnimatedSpan>
                )}
              </>
            );
          })}
        </div>
        <div className="flex gap-1.5 shrink-0 bg-none">
          {commands
            ? commands.map((cmd) => {
                return (
                  <RippleButton
                    className="rounded-full border border-border-muted bg-surface-container-low px-2 py-0.5 font-detail text-[11px] leading-none text-text-main/75 transition-colors hover:border-primary  hover:text-primary"
                    rippleColor="#03a9f4"
                    key={cmd.name}
                    onClick={() => setInputCMD(cmd.input)}
                  >
                    {cmd.name}
                  </RippleButton>
                );
              })
            : null}
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-2 flex shrink-0 items-center gap-1"
        >
          <InputGroup className=" has-[[data-slot=input-group-control]:focus-visible]:border-border-muted-alt has-[[data-slot=input-group-control]:focus-visible]:ring-0">
            <InputGroupAddon className="text-primary">
              <Icon icon="ic:outline-keyboard-arrow-right" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Insira um comando..."
              type="text"
              value={inputCMD}
              onChange={(ev) => setInputCMD(ev.target.value)}
              className="border-border-muted bg-bg-surface font-detail text-body-sm text-text-main placeholder:text-text-muted"
            />

            <InputGroupAddon
              align="inline-end"
              className=" bg-transparent focus-visible:ring-0 focus-visible:outline-none "
            >
              <RippleButton
                type="submit"
                disabled={!inputCMD.trim()}
                className="border-none bg-bg-surface h-auto w-auto p-0 font-detail text-caption font-medium text-brand-primary transition-colors disabled:cursor-not-allowed disabled:opacity-80"
              >
                {logs[logs.length - 1]?.status === "pending" ? (
                  <Spinner className="h-5 w-5" />
                ) : (
                  <Icon
                    className="h-8 w-8"
                    icon="ic:outline-keyboard-arrow-up"
                  />
                )}
              </RippleButton>
            </InputGroupAddon>
          </InputGroup>
        </form>
      </div>
    </Terminal>
  );
}

export default TerminalHero;
