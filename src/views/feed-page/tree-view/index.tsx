/* eslint-disable react/destructuring-assignment */
import * as React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import { alpha, styled } from "@mui/material/styles";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { TreeItemProps, treeItemClasses } from "@mui/lab/TreeItem";
import Collapse from "@mui/material/Collapse";
// web.cjs is required for IE11 support
import { animated, useSpring } from "@react-spring/web";
import { TransitionProps } from "@mui/material/transitions";
import { useAppDispatch, useAppSelector } from "@hooks/useReduxToolKit";
import { expandLeagueRequest, fetchLeagueInfoTreeRequest, selectLeagueIdRequest } from "@store/actions";
import { getLeagueLeftInfoList } from "@store/selector";
import { ILeagueInfoModel } from "@store/models/feed-model";

function MinusSquare(props: SvgIconProps) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props: SvgIconProps) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

// function CloseSquare(props: SvgIconProps) {
//   return (
//     <SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
//       {/* tslint:disable-next-line: max-line-length */}
//       <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
//     </SvgIcon>
//   );
// }

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: "translate3d(20px,0,0)",
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

const StyledTreeItem = styled((props: TreeItemProps) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

interface IGameItem {
  id: number;
  name: string;
  status: boolean;
}
interface INodeLeague {
  id: number;
  name: string;
  games: IGameItem[];
  status: boolean;
  countGameFail: number;
}
const dataLeague: INodeLeague[] = [
  {
    id: 1,
    name: "BOXING",
    status: true,
    countGameFail: 0,
    games: [
      {
        id: 22,
        name: "08/06:29121:2431642 Hassim Ralman Jr.",
        status: true,
      },
      {
        id: 23,
        name: "08/06:29121:2431642 Hassim Ralman Jr.",
        status: true,
      },
      {
        id: 24,
        name: "08/06:29121:2431642 Hassim Ralman Jr.",
        status: true,
      },
    ],
  },
  {
    id: 2,
    name: "BOXING 2",
    status: false,
    countGameFail: 2,
    games: [],
  },
];
interface IPropsTreeItem {
  nodeId: string;
  id: number;
  label: string;
  status: boolean;
  countGameFail: number;
  type: "GAME" | "LEAGUE";
  children?: any;
}

function TreeItemNode(props: IPropsTreeItem) {
  const { nodeId, label, status, countGameFail, children, id, type } = props;
  const dispatch = useAppDispatch();
  const o = React.useMemo(() => {
    return {
      color: status === false ? "#fd2025" : "#5c8e32",
      newLabel: countGameFail > 0 ? `${label}(${countGameFail})` : label,
    };
  }, [countGameFail, label, status]);

  const stopClick = (event: any) => {
    event.stopPropagation();
    if (type === "LEAGUE") {
      dispatch(selectLeagueIdRequest(id));
    } else if (type === "GAME") {
      // dispatch(selectGameIdSuccess({ id }));
    }
  };

  return (
    <StyledTreeItem nodeId={nodeId} label={<div onClick={stopClick}>{o.newLabel}</div>} sx={{ color: o.color }}>
      {children}
    </StyledTreeItem>
  );
}

// interface IState

export default function CustomizedTreeView() {
  // const [state,setState] = React.useState({

  // })
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchLeagueInfoTreeRequest());
  }, [dispatch]);

  const dgsLeagueList: ILeagueInfoModel[] = useAppSelector(getLeagueLeftInfoList);

  const handleToggle = (e: any, nodeIds: any) => {
    if (nodeIds && nodeIds.length > 0) {
      dispatch(expandLeagueRequest(nodeIds[0]));
    }
  };
  return (
    <TreeView
      aria-label="customized"
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      sx={{ minHeight: 380, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      onNodeToggle={handleToggle}
    >
      <>
        {dgsLeagueList.map((item) => (
          <TreeItemNode
            key={item.dgsLeague.idLeague}
            nodeId={item.dgsLeague.idLeague.toString()}
            label={item.dgsLeague.description}
            status
            countGameFail={0}
            type="LEAGUE"
            id={item.dgsLeague.idLeague}
          >
            <>
              {/* {item.games.map((g) => (
                <TreeItemNode
                  key={g.id}
                  nodeId={g.id.toString()}
                  label={g.name}
                  status={g.status}
                  countGameFail={0}
                  type="GAME"
                  id={item.id}
                />
              ))} */}
            </>
          </TreeItemNode>
        ))}
      </>
    </TreeView>
  );
}
