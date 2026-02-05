describe("Page / (E2E)", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/");
  });

  it("should show form to create a new shedulling", () => {
    cy.getByTestId("input-title").scrollIntoView().should("be.visible");
    cy.getByTestId("checkbox-publish-now")
      .scrollIntoView()
      .should("be.visible");
    cy.getByTestId("checkbox-repeat").scrollIntoView().should("be.visible");
    cy.getByTestId("input-schedule-date-time")
      .scrollIntoView()
      .should("be.visible");
    cy.getByTestId("multi-select-platforms")
      .scrollIntoView()
      .should("be.visible");
    cy.getByTestId("select-content-type").scrollIntoView().should("be.visible");
    cy.getByTestId("select-media-type")
      .scrollIntoView()
      .should("be.visible")
      .should("be.disabled");
    cy.getByTestId("input-media").scrollIntoView().should("be.visible");
    cy.getByTestId("input-caption").scrollIntoView().should("be.visible");
    cy.getByTestId("btn-submit").should("be.visible");
  });

  it("should select Instagram, WhatsApp and Facebook options in the multiselect", () => {
    cy.getByTestId("multi-select-platforms").click();
    cy.contains("Instagram").should("be.visible").click();
    cy.contains("WhatsApp").click();
    cy.contains("Facebook").click();
    cy.get("body").click(0, 0);

    cy.getByTestId("multi-select-platforms").should("contain", "Instagram");
    cy.getByTestId("multi-select-platforms").should("contain", "WhatsApp");
    cy.getByTestId("multi-select-platforms").should("contain", "Facebook");
  });

  it("should show Reel/Video, Story, Carousel and Post/Group options in the content type selection.", () => {
    cy.getByTestId("select-content-type").click();

    cy.contains("Reel / Video").should("be.visible");
    cy.contains("Story").should("be.visible");
    cy.contains("Carousel").should("be.visible");
    cy.contains("Post / Group").should("be.visible").click();

    cy.getByTestId("select-content-type").should("contain", "Post");
  });

  it("should show image, video, mix and text options in the media type selection.", () => {
    cy.getByTestId("select-media-type").click();

    cy.contains("Text").should("be.visible");
    cy.contains("Image").should("be.visible");
    cy.contains("Video").should("be.visible").click();
    cy.contains("Image / Video").should("be.visible").click();

    cy.getByTestId("select-media-type").should("contain", "Image / Video");
  });

  it("should only show the image and video options when reels and stories are selected.", () => {
    cy.get("button#contentType").click();

    cy.contains("Reel / Video").should("be.visible").click();
    cy.contains("Story").should("be.visible").click();

    cy.get("body").click(0, 0);
    cy.get("button#mediaType").click();

    cy.contains("Image").should("be.visible");
    cy.contains("Video").should("be.visible").click();

    cy.get("button#mediaType").should("contain", "Video");
  });
});
