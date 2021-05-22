function About() {
  return (
    <div className="contain mt-5">
      <header className="text-center sub-header">
        <h2>about</h2>
      </header>
      <div className="pt-5 sm:pt-10 text-justify">
        <p className="para">
          Detection of defects including cracks and flakes on wall surface in
          high-rise buildings is a crucial task of buildings’ maintenance.
        </p>
        <br />
        <p className="para">
          The input is taken from the in built web cam, which in turn is given
          to the pre -trained model . The model predicts the type of building
          defect and displayedon OpenCV window.
        </p>
        <br />
        <p className="para">
          If left undetected and untreated, these defects can signiﬁcantly aﬀect
          the structural integrity and the aesthetic aspect of buildings, timely
          and cost-eﬀective methods of building condition survey are of
          practicing need for the building owners and maintenance agencies to
          replace the time and labour-consuming approach of manual survey.
        </p>
        <br />
        <p className="para">
          The objective of the project is to build a web application to detect
          the type of building defect.
        </p>
      </div>
    </div>
  );
}

export default About;
