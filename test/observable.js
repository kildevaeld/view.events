const {
    Observable,
    Observer
} = require('../lib/observable'),
    sinon = require('sinon');

describe('Observable', () => {

    it('should', () => {

        let p = new Observer();

        let o = new Observable(p);

        const next = sinon.fake(),
            complete = sinon.fake(),
            err = sinon.fake();

        const sub = o.subscribe(next, err, complete);

        p.next('test').next('test2').complete();

        should(next.callCount).equal(2);
        should(next.getCall(0).calledWith('test'));
        should(next.getCall(1).calledWith('test2'));
        should(complete.callCount).equal(1);

        should(() => p.complete()).throw();
        should(() => p.error()).throw();
        should(() => p.next()).throw();
        should(p.closed).equal(true);

    })

});