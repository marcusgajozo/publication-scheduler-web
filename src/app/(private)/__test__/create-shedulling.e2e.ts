describe("Page / (E2E)", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/");
  });

  it("should show form to create a new shedulling", () => {
    cy.get("#title").scrollIntoView().should("be.visible");
    cy.get("#publishNow").scrollIntoView().should("be.visible");
    cy.get("#scheduleDateTime").scrollIntoView().should("be.visible");
    cy.get("#repeat").scrollIntoView().should("be.visible");
    cy.get("#platforms").scrollIntoView().should("be.visible");
    cy.get("#contentType").scrollIntoView().should("be.visible");
    cy.get("#mediaType").scrollIntoView().should("be.visible");
    cy.get("#media").scrollIntoView().should("be.visible");
    cy.get("#caption").scrollIntoView().should("be.visible");
    cy.get("#btnSubmit").should("be.visible");
  });

  it("should select Instagram, WhatsApp and Facebook options in the multiselect", () => {
    cy.get("button#platforms").click();
    cy.contains("Instagram").should("be.visible").click();
    cy.contains("WhatsApp").click();
    cy.contains("Facebook").click();
    cy.get("body").click(0, 0);

    cy.get("button#platforms").should("contain", "Instagram");
    cy.get("button#platforms").should("contain", "WhatsApp");
    cy.get("button#platforms").should("contain", "Facebook");
  });

  it("should show image, video, mix and text options in the content type selection.", () => {
    cy.get("button#contentType").click();

    cy.contains("Reel / Video").should("be.visible");
    cy.contains("Story").should("be.visible");
    cy.contains("Post / Group").should("be.visible").click();

    cy.get("button#contentType").should("contain", "Post");
  });

  it("should show image, video, mix and text options in the media type selection.", () => {
    cy.get("button#mediaType").click();

    cy.contains("Text").should("be.visible");
    cy.contains("Image").should("be.visible");
    cy.contains("Video").should("be.visible").click();
    cy.contains("Image / Video").should("be.visible").click();

    cy.get("button#mediaType").should("contain", "Image / Video");
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
