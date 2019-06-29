import React from "react"
import { Link, graphql } from "gatsby"
import moment from "moment"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

export default ({data}) => (
  <Layout>
    <SEO title="Love-Winters Family Blog" keywords={[]} />
    <div style={{ maxWidth: `960px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <p>Welcome to our family blog. We've been experiencing complicated changes in our lives, and we hope this helps keep our friends and family informed.</p>
    <p>You can contact me at "patrick [at] lovewinters.net" if you're a parent of an affected child and want any help, support, or information. I've also put together a <a href="./antiJAKGuide/">Anti JAK Guide</a> with everything I know as of May 2019 about the research and logistics of the experimental treatment that my daughter is benefiting from.</p>
    <hr/>
    <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.id}>
        <Link
          to={node.fields.slug}
          css={{ textDecoration: `none`, color: `inherit` }}
        >
          <h3 style={{ marginBottom: '4px' }}>
            {node.frontmatter.title}{" "}
            
          </h3>
          <div>{moment(node.frontmatter.date).format("LL")}</div>
        </Link>
          <p>{node.excerpt}</p>
      </div>
    ))}
  </Layout>
)

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {draft: {ne: true}, private: {ne: true}}}
      limit: 1000
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;