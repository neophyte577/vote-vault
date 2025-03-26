import { Vote, Vault } from "lucide-react";

export function VoteVaultIcon({ className = "w-5 h-5" }) {
  return (
    <span className={`relative inline-block align-middle aspect-square ${className}`}>
      <Vote className="absolute w-2/3 h-2/3 left-1/2 -top-[45%] transform -translate-x-1/2" />
      <Vault className="w-full h-full" />
    </span>
  );
}
