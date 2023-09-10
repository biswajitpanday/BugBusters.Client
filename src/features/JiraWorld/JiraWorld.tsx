import { ContentLayout } from "@/components/layout";
import { Authorization } from "@/lib/Authorization";
import { Roles } from "@/types";
import Tree from "react-d3-tree";
import jiraData from "./jiradata.json";
import treeData from "./treedata.json";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

interface Root {
  name?: string;
  children?: Child[];
}
interface Child {
  name?: string;
  children?: Child[];
  value?: number;
}



interface Field {
  timeEstimate: number;
  assignee: {};
  status: {};
  creator: {};
  reporter: {};
  issuetype: {};
  project: {};
}
interface Issues {
  id: any;
  key: string;
  self: string;
  fields: Field;
}

interface JiraTree {
  issues: Issues[];
}

export const JiraWorld = () => {
  const [jData, setJData] = useState(treeData);

  useEffect(() => {
    const tree = createTree(jiraData.issues);
    setJData(tree);
  }, []);

  const createTree = (jsonArray: any[]): any => {
    const root: Root = {name: "Mellott"};
    root.children = [];
  
    for (const item of jsonArray) {
      const child: Child = { name: item.key, value: item.self };
      root.children.push(child);
    }
  
    return root;
  };

  return (
    <Authorization allowedRoles={[Roles.User, Roles.Admin]}>
      <ContentLayout isFluid={true} title="Jira World">
        <div id="treeWrapper" style={{ width: "100%", height: "700px" }}>
          <Tree
            data={jData}
            translate={{ x: 960, y: 50 }}
            orientation="vertical"
          />
        </div>
      </ContentLayout>
    </Authorization>
  );
};
