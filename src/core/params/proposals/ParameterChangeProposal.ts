import { JSONSerializable } from '../../../util/json';
import { ParamChange, ParamChanges } from '../ParamChange';
import { Any } from '@web4/iq.proto/google/protobuf/any';
import { ParameterChangeProposal as ParameterChangeProposal_pb } from '@web4/iq.proto/cosmos/params/v1beta1/params';

/**
 * Describes a proposal for directly altering the value of the module parameters.
 * If you want to select a couple parameters to change for your proposal, you'll first
 * include the subspace (module it belongs to, such as "oracle" or "distribution"), and
 * then just the specific keys that you want to include in your changes as items in a
 * JavaScript object.
 *
 * ```ts
 * import {
 *    Dec,
 *    MsgSubmitProposal,
 *    ParameterChangeProposal
 * } from "@web4/iq.js";
 *
 * const proposal = new ParameterChangeProposal("title", "description", {
 *    market: {
 *      minspread: new Dec(0.25),
 *      basepool: new Dec(10000000)
 *    },
 *    staking: {
 *      UnbondingTime: 15000000
 *    }
 * });
 *
 * const msg = new MsgSubmitProposal();
 * ```
 */
export class ParameterChangeProposal extends JSONSerializable<
  ParameterChangeProposal.Amino,
  ParameterChangeProposal.Data,
  ParameterChangeProposal.Proto
> {
  public changes: ParamChanges;

  /**
   * @param title proposal's title
   * @param description proposal's description
   * @param changes an object whose keys are subspace names, and whose values are objects
   * with objects having for keys and values, the desired parameter changes.
   */
  constructor(
    public title: string,
    public description: string,
    changes: ParamChange.Data[] | ParamChanges
  ) {
    super();
    if (Array.isArray(changes)) {
      this.changes = ParamChanges.fromData(changes);
    } else {
      this.changes = changes;
    }
  }

  public static fromAmino(
    data: ParameterChangeProposal.Amino
  ): ParameterChangeProposal {
    const {
      value: { title, description, changes },
    } = data;
    return new ParameterChangeProposal(
      title,
      description,
      ParamChanges.fromAmino(changes)
    );
  }

  public toAmino(): ParameterChangeProposal.Amino {
    const { title, description, changes } = this;
    return {
      type: 'params/ParameterChangeProposal',
      value: {
        title,
        description,
        changes: changes.toAmino(),
      },
    };
  }

  public static fromData(
    proto: ParameterChangeProposal.Data
  ): ParameterChangeProposal {
    const { title, description, changes } = proto;
    return new ParameterChangeProposal(
      title,
      description,
      ParamChanges.fromData(changes)
    );
  }

  public toData(): ParameterChangeProposal.Data {
    const { title, description, changes } = this;
    return {
      '@type': '/cosmos.params.v1beta1.ParameterChangeProposal',
      title,
      description,
      changes: changes.toData(),
    };
  }

  public static fromProto(
    proto: ParameterChangeProposal.Proto
  ): ParameterChangeProposal {
    return new ParameterChangeProposal(
      proto.title,
      proto.description,
      ParamChanges.fromProto(proto.changes)
    );
  }

  public toProto(): ParameterChangeProposal.Proto {
    const { title, description, changes } = this;
    return ParameterChangeProposal_pb.fromPartial({
      changes: changes.toProto(),
      description,
      title,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.params.v1beta1.ParameterChangeProposal',
      value: ParameterChangeProposal_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): ParameterChangeProposal {
    return ParameterChangeProposal.fromProto(
      ParameterChangeProposal_pb.decode(msgAny.value)
    );
  }
}

export namespace ParameterChangeProposal {
  export interface Amino {
    type: 'params/ParameterChangeProposal';
    value: {
      title: string;
      description: string;
      changes: ParamChange.Amino[];
    };
  }

  export interface Data {
    '@type': '/cosmos.params.v1beta1.ParameterChangeProposal';
    title: string;
    description: string;
    changes: ParamChange.Data[];
  }

  export type Proto = ParameterChangeProposal_pb;
}
