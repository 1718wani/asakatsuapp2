import { getRule } from "../apis/rules/getRule";
import { RuleDetailForFirstApproval } from "../components/RuleDetailForFirstApproval";
import { useQuery } from "@tanstack/react-query";

type RuleProps = {
  roomId: string | string[] | undefined;
};

export const FirstApproveRoomRulePageComponent = (props: RuleProps) => {
  const {
    data: rule,
    isLoading: ruleLoading,
    error: ruleError,
  } = useQuery({
    queryKey: ["roomRule"],
    queryFn: () => getRule(Number(props.roomId)),
  });

  return (
    rule &&
    rule.rules && (
      <RuleDetailForFirstApproval
        roomId={Number(props.roomId)}
        rules={rule?.rules}
      />
    )
  );
};
