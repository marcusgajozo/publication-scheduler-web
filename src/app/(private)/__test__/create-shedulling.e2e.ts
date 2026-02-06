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

    cy.getByTestId("select-content-type")
      .scrollIntoView()
      .should("be.visible")
      .should("be.disabled");

    cy.getByTestId("select-media-type")
      .scrollIntoView()
      .should("be.visible")
      .should("be.disabled");

    cy.getByTestId("input-media")
      .scrollIntoView()
      .should("be.visible")
      .should("be.disabled");

    cy.getByTestId("input-caption")
      .scrollIntoView()
      .should("be.visible")
      .should("be.disabled");

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

  it("should remove Story option in the content type selection when WhatsApp is selected.", () => {
    cy.getByTestId("multi-select-platforms").click();
    cy.contains("WhatsApp").click();

    cy.get("body").click(0, 0);

    cy.getByTestId("select-content-type").scrollIntoView().click();

    cy.contains("Reel / Video").should("be.visible");
    cy.contains("Carousel").should("be.visible");
    cy.contains("Post / Group").should("be.visible");

    cy.contains("Story").should("not.be.visible");
    cy.get("body").click(0, 0);
  });

  it("should just show Video option when reels is selected.", () => {
    cy.getByTestId("multi-select-platforms").click();
    cy.contains("Instagram").click();
    cy.get("body").click(0, 0);

    cy.getByTestId("select-content-type").click();
    cy.contains("Reel / Video").should("be.visible").click();
    cy.get("body").click(0, 0);

    cy.getByTestId("select-media-type").click();

    cy.contains("Video").should("be.visible");
    cy.contains("Image").should("not.be.visible");
    cy.contains("Text").should("not.be.visible");
    cy.contains("Image / Video").should("not.be.visible");
    cy.get("body").click(0, 0);
  });

  it("should remove Text option when carousel is selected.", () => {
    cy.getByTestId("multi-select-platforms").click();
    cy.contains("Instagram").click();
    cy.get("body").click(0, 0);

    cy.getByTestId("select-content-type").click();
    cy.contains("Carousel").should("be.visible").click();
    cy.get("body").click(0, 0);

    cy.getByTestId("select-media-type").click();

    cy.contains("Text").should("not.be.visible");
    cy.contains("Image").should("be.visible");
    cy.contains("Video").should("be.visible");
    cy.contains("Image / Video").should("be.visible");

    cy.get("body").click(0, 0);
  });

  it("should show Text option when whatsapp is selected alone.", () => {
    cy.getByTestId("multi-select-platforms").click();
    cy.contains("WhatsApp").click();
    cy.get("body").click(0, 0);

    cy.getByTestId("select-content-type").click();
    cy.contains("Post / Group").should("be.visible").click();
    cy.get("body").click(0, 0);

    cy.getByTestId("select-media-type").click();

    cy.contains("Text").should("be.visible");
    cy.get("body").click(0, 0);

    cy.getByTestId("multi-select-platforms").click();
    cy.contains("Instagram").click();
    cy.get("body").click(0, 0);

    cy.getByTestId("select-media-type").click();

    cy.contains("Text").should("not.be.visible");
    cy.get("body").click(0, 0);
  });
});
