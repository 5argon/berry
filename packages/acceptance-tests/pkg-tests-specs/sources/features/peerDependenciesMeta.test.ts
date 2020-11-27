describe(`Features`, () => {
  describe(`peerDependenciesMeta`, () => {
    test(
      `it should report a warning when omitting a peer dependencies`,
      makeTemporaryEnv(
        {
          dependencies: {[`peer-deps`]: `1.0.0`},
        },
        async ({path, run, source}) => {
          const {stdout} = await run(`install`);

          expect(stdout).toContain(`YN0002`);
        },
      ),
    );

    test(
      `it should not report a warning when omitting an optional peer dependency`,
      makeTemporaryEnv(
        {
          dependencies: {[`optional-peer-deps`]: `1.0.0`},
        },
        async ({path, run, source}) => {
          const {stdout} = await run(`install`);

          expect(stdout).not.toContain(`YN0002`);
        },
      ),
    );

    test(
      `it should report collapsed mismatched peer dependency warnings when a set of mismatched peerDependency requirements is detected`,
      makeTemporaryEnv(
        {
          dependencies: {
            [`mismatched-peer-deps-lvl0`]: `1.0.0`,
            [`no-deps`]: `1.1.0`,
          },
        },
        async ({path, run, source}) => {
          const {stdout} = await run(`install`);

          expect(stdout).toMatch(/\(([0-9a-f]{5})\) provides no-deps with version 1.1.0 which doesn't satisfy what mismatched-peer-deps-lvl0@npm:1.0.0 and its descendants request \(run yarn explain peer-requirements \1 for details\)/);
        },
      ),
    );
  });
});