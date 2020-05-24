import { async, TestBed } from "@angular/core/testing";
import { WbcModule } from "./wbc.module";

describe("WbcModule", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [WbcModule]
    }).compileComponents();
  }));

  it("should create", () => {
    expect(WbcModule).toBeDefined();
  });
});
