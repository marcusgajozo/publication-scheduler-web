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

  it("should show Instagram, WhatsApp, and Facebook page options in the content type selection.", () => {
    cy.get("#contentType").select("Instagram");
    cy.get("#contentType").select("WhatsApp");
    cy.get("#contentType").select("Facebook");
  });

  it("should show image, video, mix and text options in the media type selection.", () => {
    cy.get("#mediaType").select("image");
    cy.get("#mediaType").select("video");
    cy.get("#mediaType").select("mix");
    cy.get("#mediaType").select("text");
  });

  it(
    "should only show the image and video options when reels and stories are selected.",
  );
});
