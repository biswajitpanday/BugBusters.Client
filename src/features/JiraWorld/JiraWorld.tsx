import { ContentLayout } from "@/components/layout";
import { Authorization } from "@/lib/Authorization";
import { Roles } from "@/types";
import Tree, { CustomNodeElementProps } from "react-d3-tree";
import jiraData from "./jiradata.json";
import mellottData from "./mellott.json";
import treeData from "./treedata.json";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import * as React from "react";

interface Root {
  id: any;
  name?: string;
  children?: Child[];
  link?: string;
  attributes?: Attribute;
}
interface Child {
  id: any;
  name?: string;
  children?: Child[];
  value?: number;
  link?: string;
  attributes?: Attribute;
}

interface Attribute {
  id: any;
  value?: number;
  link?: string;
}

interface InWardIssue {
  // Child  IssueLinks[] => InWardIssue => Key
  id: any;
  self: string;
  key?: string;
  fields: Field;
}

interface OutWardIssue {
  // Child  IssueLinks[] => InWardIssue => Key
  id: any;
  self: string;
  key?: string;
  fields: Field;
}

interface IssueLink {
  id: any;
  self: string;
  key?: string;
  inwardIssue: InWardIssue;
  outwardIssue: OutWardIssue;
}

interface Field {
  timeEstimate: number;
  assignee: {};
  status: {};
  creator: {};
  reporter: {};
  issuetype: {};
  project: {};
  issuelinks: IssueLink[];
}
interface Issue {
  id: any;
  self: string;
  key?: string;
  fields: Field;
  link: string;
}

interface JiraTree {
  issues: Issue[];
}

export const JiraWorld = () => {
  const [jData, setJData] = useState({
    name: "",
    children: [],
  });

  useEffect(() => {
    const tree = createTree(
      extractJson(mellottData.issues),
      mellottData.issues
    );
    console.log(tree);
    setJData(tree);
  }, []);

  const createTree = (jsonArray: any[], issues: any[]): any => {
    const root: Root = {
      id: issues[0].fields.project.id,
      name: issues[0].fields.project.name,
      children: [],
      link: ""
    };
    root.children = [];
    for (const item of jsonArray) {
      const child: Child = {
        id: item.id,
        name: item.name,
        value: item.self,
        children: item.children,
        link: item.self,
        attributes: { id: item.id, link: item.self, value: item.self}
      };

      root.children.push(child);
    }
    return root;
  };

  const extractJson = (issues: any[]): any => {
    const tree: Root[] = [];
    issues.map((item) => {
      if (item.key)
        tree.push({
          id: item.id,
          name: item.key,
          children: extractJson(
            issueLinksConvertToIssue(item.fields?.issuelinks)
          ),
          link: item.self,
          attributes: {id: item.id, link: item.self, value: item.self}
        });
    });
    return tree;
  };

  const issueLinksConvertToIssue = (issueLinks: IssueLink[]): Issue[] => {
    if (!issueLinks || issueLinks.length <= 0) return [];
    let issues: Issue[] = [];
    if (issueLinks.some((x) => x.inwardIssue))
      issues = [...inWardIssues(issueLinks)];
    if (issueLinks.some((x) => x.outwardIssue))
      issues = [...outWardIssues(issueLinks)];
    return issues;
  };

  const inWardIssues = (issueLinks: IssueLink[]): Issue[] => {
    const issues: Issue[] = [];
    issueLinks.map((issueLink) => {
      issues.push({
        key: issueLink.inwardIssue?.key,
        id: issueLink.inwardIssue?.id,
        self: issueLink.inwardIssue?.self,
        fields: issueLink.inwardIssue?.fields,
        link: issueLink.inwardIssue?.self,
      });
    });
    return issues;
  };

  const outWardIssues = (issueLinks: IssueLink[]): Issue[] => {
    const issues: Issue[] = [];
    issueLinks.map((issueLink) => {
      issues.push({
        key: issueLink.outwardIssue?.key,
        id: issueLink.outwardIssue?.id,
        self: issueLink.outwardIssue?.self,
        fields: issueLink.outwardIssue?.fields,
        link: issueLink.outwardIssue?.self,
      });
    });
    return issues;
  };
  const createLink = (name?: string, link?: string): string => {
    return `<a href="${link}" >${name}</a>`;
  };

  const renderCustomNode = (rd3tNodeProps: CustomNodeElementProps): any => {
    console.log(rd3tNodeProps);
    return <a href="#">{rd3tNodeProps.nodeDatum.name}</a>;
  };

  const RenderRectSvgNode = (props: CustomNodeElementProps) => {
    //document.querySelector(`${props.nodeDatum.__rd3t.id}`)?.addEventListener("click", () => alert(props.nodeDatum.name));
    // let id = uuidv4();
    // console.log(document.getElementById(`#${id}`));
    // document.getElementById(`#${id}`)?.addEventListener("click", () => alert(props.nodeDatum.name));
    // document
    //   .querySelector("g")
    //   ?.addEventListener("click", () => alert("clicked"));
    //debugger;
    return (
      //<g id={props.nodeDatum.__rd3t.id}>
      //<g id={id}>
      <g>
        <rect width="20" height="20" x="-10" onClick={props.toggleNode} />
        <text fill="black" strokeWidth="1" x="20">
          Title: {props.nodeDatum.name}
        </text>

        {props.nodeDatum?.attributes?.id && (
          <text fill="black" x="20" dy="20" strokeWidth="1">
            Link: {props.nodeDatum?.attributes?.id}
          </text>
        )}
      </g>
    );
  };

  return (
    <Authorization allowedRoles={[Roles.User, Roles.Admin]}>
      <ContentLayout isFluid={true} title="Jira World">
        <div id="treeWrapper" style={{ width: "100%", height: "700px" }}>
          <Tree
            data={jData}
            translate={{ x: 960, y: 50 }}
            orientation="vertical"
            renderCustomNodeElement={RenderRectSvgNode}
          />
        </div>
      </ContentLayout>
    </Authorization>
  );
};
