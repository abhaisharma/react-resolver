import assert from "assert";
import React from "react";

import { Container } from "../src";
import Fixture from "./support/Fixture";

describe("Container", function() {
  describe(".propTypes", function() {
    describe(".resolve", function() {
      beforeEach(function() {
        this.declaration = Container.propTypes.resolve;
      });

      it("should be set", function() {
        assert.equal(this.declaration, React.PropTypes.object.isRequired);
      });

      it("should return an Error when not set", function() {
        const error = this.declaration({}, "resolve", "Fixture", "prop");

        assert(error instanceof Error);
        assert.equal(error.message, "Required prop `resolve` was not specified in `Fixture`.");
      });

      it("should pass when set", function() {
        const error = this.declaration({ resolve: {} }, "resolve", "Fixture", "prop");

        assert.equal(error, null);
      });
    });
  });

  it("should not resolve props that already set", function() {
    const element = (
      <Container
        component={Fixture}
        user="Exists"
        resolve={{
          user: function() {
            throw new Error("`user` should not have been called");
          },
        }}
      />
    );

    React.renderToStaticMarkup(element);
  });
});
