import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import png01 from "../../../static/img/1.webp";
import png02 from "../../../static/img/2.webp";
import png03 from "../../../static/img/3.webp";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "技术",
    // Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    Svg: png01,
    description: (
      <>
        自我驱动充实能力
      </>
    ),
  },
  {
    title: "心境",
    // Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    Svg: png02,
    description: (
      <>
        
      </>
    ),
  },
  {
    title: "力量",
    Svg: png03,
    description: (
      <>
        
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img className={styles.img} src={Svg} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
